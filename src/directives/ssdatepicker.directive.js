
(function() {
    'use strict';
    angular.module('ss.bootstrap-component')
        .directive('ssDatePicker', ssDatePicker);

    ssDatePicker.$inject = ['lodash', 'moment'];

    function ssDatePicker (lodash, moment) {

        return {

            restrict: 'A',
            require: 'ngModel',
            scope: {
                opts: '=options',
                model: '=ngModel',
                checkChanges: '&'
            },
            link: function ($scope, el, attrs, ngModel) {

                $scope.setLabel = setLabel;

                el.daterangepicker({

                    autoUpdateInput: false,
                    ranges: $scope.opts.ranges,
                    locale: $scope.opts.locale

                });

                el.on('apply.daterangepicker', function(ev, picker) {

                    $scope.setLabel(picker.startDate, picker.endDate);

                    return $scope.$apply(function () {
                        ngModel.$setViewValue({
                            startDate: picker.startDate,
                            endDate: picker.endDate
                        });
                    });
                });

                ngModel.$render = function () {

                    if (ngModel.$modelValue && ngModel.$modelValue.startDate) {

                        el.data('daterangepicker').setStartDate(ngModel.$modelValue.startDate.format($scope.opts.locale.format));
                        el.data('daterangepicker').setEndDate(ngModel.$modelValue.endDate.format($scope.opts.locale.format));
                        $scope.setLabel(ngModel.$modelValue.startDate, ngModel.$modelValue.endDate);
                    }
                };

                function setLabel(start, end) {
                    var selectedKey;

                    lodash.forEach(($scope.opts.ranges), function (obj, key) {
                        if (obj[0].isSame(start, 'day') && obj[1].isSame(end, 'day')) {
                            selectedKey = key;
                            return;
                        }
                    });

                    if (selectedKey) {
                        el.val(selectedKey);
                    } else if (start === '') {
                        el.val('');
                    }
                    else {
                        el.val(moment(start).format($scope.opts.locale.format) + ' - ' + moment(end).format($scope.opts.locale.format));
                    }
                }

            }
        };
    }
})();

