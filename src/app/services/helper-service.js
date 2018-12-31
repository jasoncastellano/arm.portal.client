(function () {
    'use strict';

    angular
        .module("app")
        .factory("helperService", helperService);

    /* ngInject */
    function helperService(moment) {
        var service = {
            getPeriodOfDay: getPeriodOfDay,
            printPreview: printPreview
        };

        return service;

        function getPeriodOfDay() {
            let hour = moment().hour(),
                periodOfDay = "";

            if (hour >= 5 && hour < 12) {
                periodOfDay = "morning";
            } else if (hour >= 12 && hour < 17) {
                periodOfDay = "afternoon";
            } else {
                periodOfDay = "evening"
            }

            return periodOfDay;
        }

        function printPreview() {
            if ($.browser.name == 'unknown') {
                var OLECMDID = 7;
                var PROMPT = 1; // 2 DONTPROMPTUSER
                var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
                document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
                WebBrowser1.ExecWB(OLECMDID, PROMPT);
                WebBrowser1.outerHTML = "";
            } else {
                window.print();
            }
        }
    }


})();