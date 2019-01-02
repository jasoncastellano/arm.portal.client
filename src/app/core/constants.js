import moment from 'moment';
import toastr from 'toastr';

export const moment = moment;
export const toastr = toastr;
export const _ = window._;
export const datepickerOptions = {
    minDate: new Date(2000, 1, 1),
    maxDate: new Date(2199, 12, 31),
    showWeeks: false
};

export const sweetAlertOptions = {
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
};