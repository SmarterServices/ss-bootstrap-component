
(function() {
    'use strict';
    angular.module('ss.bootstrap-component')
        .directive('ssMultiSelect', ssMultiSelect);


    ssMultiSelect.$inject =  ['lodash', 'moment'];

    function ssMultiSelect(lodash, moment) {

        return {

            restrict: 'E',
            template: '<select multiple="multiple"></select>',
            scope: {
                allgroups: '=',
                selectedgroups: '=',
                checkChanges: '&'

            },

            link: function ($scope, el, attrs, vm) {

                var noSelectionMessage = 'Showing all groups.';

                el.find('select').multiselect({
                    includeSelectAllOption: true,
                    enableFiltering: true,
                    maxHeight: 200,
                    buttonText: function(options, select) {
                        return 'Add Group';
                    },
                    onDropdownHide: function(event) {

                        var parentContainer = $('.multi-select-container');
                        var selectedOptions = this.getSelected();
                        var outputContainer = $('.selected-options');
                        var selectedOutput  = noSelectionMessage;
                        var tempGroupsToPush = [];
                        if(selectedOptions.length > 0) {

                            selectedOutput = $('<ul class="list-unstyled"></ul>');
                            selectedOptions.each(function(){
                                var groupToFind = $(this).val();


                                var groups = lodash.find(vm.selectedgroups, function(group) {
                                    return group === groupToFind;
                                });

                                if (!groups) {
                                    tempGroupsToPush.push(groupToFind);
                                }

                                selectedOutput.append("<li><span class='title'>"+$(this).text()+"</span> <span class='count'>"+$(this).data('count')+"</span> <i class='remove fa fa-times' title='remove filter'></i></li>");
                            });

                            if (tempGroupsToPush.length > 0) {
                                lodash.forEach(tempGroupsToPush, function(key) {
                                    vm.selectedgroups.push(key);
                                });
                            }
                        } else {
                            vm.selectedgroups.length = 0;
                        }
                        outputContainer.html(selectedOutput);
                        vm.checkChanges();

                    }
                });

                $scope.$watch('vm.allgroups', function() {

                    if (vm.allgroups.length > 0) {

                        var selectedOutput  = noSelectionMessage;
                        var outputContainer = el.find('select');
                        selectedOutput = '';
                        lodash.forEach(vm.allgroups, function (assessmentGroup) {
                            selectedOutput += '<option value="' + assessmentGroup.key + '" data-count="' + assessmentGroup.count + '">' + assessmentGroup.label + '</option>';
                        });
                        outputContainer.html(selectedOutput);
                        el.find('select').multiselect('rebuild');

                        var outputContainer = $('.selected-options');

                        if (vm.selectedgroups.length > 0) {
                            el.find('select').multiselect('select', vm.selectedgroups);
                            selectedOutput = $('<ul class="list-unstyled"></ul>');
                            lodash.forEach(vm.selectedgroups, function(key) {
                                var select = el.find('select').find('option[value=' + key+']');
                                selectedOutput.append("<li><span class='title'>" + select.text() + "</span> <span class='count'>" + select.data('count') + "</span> <i class='remove fa fa-times' title='remove filter'></i></li>");
                            });
                            el.find('select').multiselect('refresh');
                            outputContainer.html(selectedOutput);
                        }
                    }

                });

                //$scope.$watchCollection('vm.selectedgroups', function() {
                //    console.log('selected group watch fired');
                //    vm.checkChanges();
                //});

                $('.assessment-groups').on('click', '.remove', function() {
                    var removedOptionText = $(this).siblings('.title').first().text();
                    var removedOptionVal  = $(this).siblings('.count').first().text();
                    var outputContainer = $('.selected-options');

                    $('.multi-select-container select').multiselect('deselect', removedOptionVal);

                    $(this).parents('li').remove();
                    if(outputContainer.find('li').length === 0) {
                        outputContainer.html(noSelectionMessage);
                    }

                });

            },

            controller: ssMultiSelectController,
            controllerAs: 'vm',
            bindToController: true // because the scope is isolated
        };
    }

    ssMultiSelectController.$inject = ['$scope'];

    function ssMultiSelectController($scope) {

        var vm = this;
    }
})();

