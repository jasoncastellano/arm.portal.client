/* global toastr:false, moment:false */
(function () {
    "use strict";

    angular
        .module("app.core")
        .constant("toastr", toastr)
        .constant("moment", moment)
        .constant("_", window._)
        .constant('datepickerOptions', {
            minDate: new Date(2000, 1, 1),
            maxDate: new Date(2199, 12, 31),
            showWeeks: false
        })
        .constant('sweetAlertOptions',
        {
            prompt: {
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
                width: "650px"
            }
        });
})();
