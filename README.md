# ss-bootstrap-component

## Installation via Bower
The easiest way to install the picker is:
```
bower install ss-bootstrap-component --save
```

Declare dependency:

```
App = angular.module('app', ['ss.bootstrap-component']);
```

#  Angular.js directive for Dan Grossmans's [Bootstrap Datepicker](https://github.com/dangrossman/bootstrap-daterangepicker).

Prepare model in your controller.
```
$scope.datePicker = {};

$scope.datePicker.date = {
    startDate: '',
    endDate: ''
};

$scope.datePicker.options = {
    ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    locale: {
        cancelLabel: 'Clear',
        format: 'YYYY-MM-DD'
    },
    eventHandlers:{
    }
};
```
Then in your HTML just add attribute `ss-date-picker` to any input and bind it to model.
```
<div ng-controller="TestCtrl">
    <input ss-date-picker type="text" ng-model="datePicker.date" ng-change="onDateChange()" options="datePicker.options"  placeholder="Set a range">
</div>
```


# Angular.js directive for [Bootstrap Multiselect](https://github.com/davidstutz/bootstrap-multiselect)

Prepare model in your controller.

```
$scope.selectedOptions = [];
$scope.allOptions = [
    {'key': 'Option 1', 'label': 'Option 1', 'count': 10},
    {'key': 'Option 2', 'label': 'Option 2', 'count': 15}
];

```

Then add the directive in your html file. 2 divs are needed along with the directive as shown here.

```

<div class="assessment-group-picker">
    <ss-multi-select selectedgroups="selectedOptions" allgroups="allOptions" check-changes="checkChanges()"/>
</div>

<div class="selected-options">Showing Selected Options</div>

```

check-changes is going to point to a function that will be triggered when any changes to `selectedOptions` is made by selection.


See `index.html` inside example folder for a working demo.
