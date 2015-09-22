define(function (require, exports) {
    var $ = require('jquery');
    var chromeUtil = require('chromeUtil').chromeLocalStorage;
    var promise = require('promise');

    function setting_export() {
        var export_obj = {
            fixpack: {},
            qar: {},
            custom: {}
        };

        promise.chain([
            function () {
                return chromeUtil.getLocalStorageSync('fp_obj');
            },
            function (err, result) {
                export_obj.fixpack.fp_obj = result;
                return chromeUtil.getLocalStorageSync('parameter_fp');
            },
            function (err, result) {
                export_obj.fixpack.parameter_fp = result;
                return chromeUtil.getLocalStorageSync('qar_obj');

            },
            function (err, result) {
                export_obj.qar.qar_obj = result;
                return chromeUtil.getLocalStorageSync('parameter_qar');
            },
            function (err, result) {
                export_obj.qar.parameter_qar = result;
                return chromeUtil.getLocalStorageSync('custom_obj');
            },
            function (err, result) {
                export_obj.custom.custom_obj = result;
                return chromeUtil.getLocalStorageSync('custom_count');
            }
        ]).then(
            function (err, result) {
                export_obj.custom.custom_count = result;
                $('#editor').val(JSON.stringify(export_obj));
            }
        );
    }

    function setting_import() {
        var import_obj = JSON.parse($('#editor').val());

        promise.chain([
            function () {
                return chromeUtil.removeLocalStroageAllSync();
            },
            function () {
                return chromeUtil.setLocalStorageSync({'fp_obj': import_obj.fixpack.fp_obj});
            },
            function () {
                return chromeUtil.setLocalStorageSync({'parameter_fp': import_obj.fixpack.parameter_fp});
            },
            function () {
                return chromeUtil.setLocalStorageSync({'qar_obj': import_obj.qar.qar_obj});
            },
            function () {
                return chromeUtil.setLocalStorageSync({'parameter_qar': import_obj.qar.parameter_qar});
            },
            function () {
                return chromeUtil.setLocalStorageSync({'custom_obj': import_obj.custom.custom_obj});
            },
            function () {
                return chromeUtil.setLocalStorageSync({'custom_count': import_obj.custom.custom_count});
            }
        ]).then(function () {
            console.log('All setting objects have been imported.')
        });
    }

    exports.init = function () {
        $('#import_export').show();
        $('#setting_export').click(function () {
            setting_export();
        });

        $('#setting_import').click(function () {
            setting_import();
        });
    };

    exports.export = function () {

    };

    exports.import = function () {

    };
});