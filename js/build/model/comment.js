'use strict';

define(function (require, exports) {
    var custom = require('custom');
    var fixpack = require('fixpack');
    var qar = require('qar');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    //var isMaster = result.enable_branch.master;
    //var is62 = result.enable_branch._71x;
    //var is61 = result.enable_branch._70x;

    var init_checked = {
        master: true,
        _71x: true,
        _71fp: true,
        _70fp: true,
        _70x: true,
        master_r: true,
        _71x_r: true,
        _71fp_r: true,
        _70fp_r: true,
        _70x_r: true
    };

    //fix pack templates metadata
    var descriptions_fp = {
        pa: 'The sub task is passed due to it can be passed',
        pacr: 'The sub task is passed due to developer\'s reply',
        fcr: 'The sub task is failed due to cannot reproduced',
        f: 'The sub task is failed due to wrong fix',
        ct: 'The sub task cannot be tested by manual.',
        rm: 'Sub task is removed from the Fix Pack.',
        bprc: 'Cannot reproduced comment on BPR tickets.',
        bprf: 'Failed comment on BPR tickets.',
        crv: 'Need others to verify because it cannot be reproduced',
        fv: 'Need others to verify because it is failed.',
        mail: 'Try to mail developers for help.',
        all: 'All the sub tasks are completed.'
    };

    var descriptions_qar = {
        "pani": 'The LPS is passed without instructions.',
        "pai": 'The LPS is passed with instructions.',
        "nlni": 'The LPS is no longer reproduced without instructions.',
        "nli": 'The LPS is no longer reproduced with instructions.',
        "fani": 'The LPS is failed without instructions.',
        "fai": 'The LPS is failed with instructions.',
        "qavr": 'The QA-V LPS could be reproduced.',
        "qavnl": 'The QA-V LPS no longer reproduced.'
    };

    var templates_fp = {
        "pa": "PASSED Manual Testing for " + "${LPS}" + ".\n" + "\n" + "Reproduced on:\n" + "${portal_branch}" + ".\n" + "\n" + "Passed on:\n" + "${portal_branch}" + " + " + "${fix_pack_name}" + ".",

        "pacr": "PASSED Manual Testing for " + "${LPS}" + ".\n" + "\n" + "Cannot be reproduced on:\n" + "${portal_branch}" + "${regression_env}" + "\n" + "Due to this issue is caused by " + "${LPS}" + " and " + "${LPS}" + " is also in the same patch, so I can't reproduced it.\n" + "\n" + "Passed on:\n" + "${portal_branch}" + " + " + "${fix_pack_name}" + ".",

        "fcr": "FAILED Manual Testing for " + "${LPS}" + "(" + "${BPR}" + ").\n" + "\n" + "Cannot be reproduced on:\n" + "${portal_branch}" + "${regression_env}" + "\n",

        "f": "FAILED Manual Testing for " + "${LPS}" + "(" + "${BPR}" + ").\n" + "\n" + "Reproduced on:\n" + "${portal_branch}" + "${regression_env}" + "\n" + "\n" + "Failed on:\n" + "${portal_branch}" + " + " + "${fix_pack_name}" + ".",

        "ct": "This can't be tested by manual.\n" + "{code:xml}\nHere is the proof. It can be the comment from the LPS, message from email or Skype.\n{code}",

        "rm": "I'll close this sub-task as complete because it is removed from " + "${fix_pack_name}" + ".",

        "bprc": "Can't reproduce " + "${LPS}" + " on " + "${portal_branch}" + "${regression_env}" + "\n" + "[No/A] regression was found on " + "${portal_branch}" + " + " + "${fix_pack_name}" + " by using the steps in " + "${LPS}" + ".\n" + "{Give more information about the regression you have found}",

        "bprf": "Fail to test " + "${LPS}" + " on " + "${portal_branch}" + " + " + "${fix_pack_name}" + ".\n" + "${LPS}" + "[can/can't] be reproduced on Portal {portal-head-branch} GIT ID: {GITK}.\n" + "NOTE: Additional information that you think is helpful. If there is a lot thing you need to add, feel free to add a new comment instead.",

        "crv": "The " + "${LPS}" + " can't be reproduced on " + "${portal_branch}" + ", need another person to verify this again.",

        "fv": "The " + "${LPS}" + " is failed on " + "${portal_branch}" + " + " + "${fix_pack_name}" + ", need another person to verify this again.",

        "mail": "Send email to developer for help.",

        "all": "All the tickets are passed for manual testing."
    };

    // qa-r templates
    var templates_qar = generateQAR(init_checked);

    //data exports
    exports.templates_fp = templates_fp;
    exports.descriptions_fp = descriptions_fp;
    exports.templates_qar = templates_qar;
    exports.descriptions_qar = descriptions_qar;

    exports.generateQAR = generateQAR;

    function generateQAR(isChecked) {
        var rep_master = isChecked.master_r ? "${server_master_r}" + " + " + "${db}" + ". " + "Portal Master GIT ID: " + "${gitk_master_r}" + ".\n" : '';
        var rep_71 = isChecked._71x_r ? "${server_71_r}" + " + " + "${db}" + ". " + "Portal 7.1.x-Private GIT ID: " + "${gitk_71x_r}" + ".\n" : '';
        var rep_71fp = isChecked._71fp_r ? "${server_71fp_r}" + " + " + "${db}" + ". " + "Portal 7.1.10.1 DXP SP1 " + "${gitk_71fp_r}" + ".\n" : '';        
        var rep_70 = isChecked._70x_r ? "${server_70_r}" + " + " + "${db}" + ". " + "Portal 7.0.x-Private GIT ID: " + "${gitk_70x_r}" + ".\n" : '';
        var rep_70fp = isChecked._70fp_r ? "${server_70fp_r}" + " + " + "${db}" + ". " + "Portal 7.0.10.10 DXP SP10 " + "${gitk_70fp_r}" + ".\n" : '';

        var rep = rep_master + rep_71 + rep_70 + rep_71fp + rep_70fp;

        var fix_master = isChecked.master ? "${server_master}" + " + " + "${db}" + ". " + "Portal Master GIT ID: " + "${gitk_master}" + ".\n" : '';
        var fix_71 = isChecked._71x ? "${server_71}" + " + " + "${db}" + ". " + "Portal 7.1.x-Private GIT ID: " + "${gitk_71x}" + ".\n" : '';
        var fix_71fp = isChecked._71fp ? "${server_71fp}" + " + " + "${db}" + ". " + "Portal 7.1.10.1 DXP SP1 " + "${gitk_71fp_r}" + ".\n" : '';
        var fix_70 = isChecked._70x ? "${server_70}" + " + " + "${db}" + ". " + "Portal 7.0.x-Private GIT ID: " + "${gitk_70x}" + ".\n" : '';
        var fix_70fp = isChecked._70fp ? "${server_70fp}" + " + " + "${db}" + ". " + "Portal 7.0.10.10 DXP SP10 " + "${gitk_70fp_r}" + ".\n" : '';

        var fix = fix_master + fix_71 + fix_70 + fix_70fp + fix_70fp;

        var content = "\n" + "Reproduced on:\n" + rep + "\n" + "Explanation.\n" + "\n" + "Fixed on:\n" + fix + "\n" + "Explanation.\n";

        var content_fail = "\n" + "Reproduced on:\n" + rep + "\n" + "Explanation.\n" + "\n" + "Failed on:\n" + fix + "\n" + "Explanation.\n";

        var templates_qar = {
            "pani": "PASSED Manual Testing using the following steps:\n" + "\n" + "# Step1\n# Step2\n# Step3\n" + content,

            "pai": "PASSED Manual Testing following the steps in the description.\n" + content,

            "nlni": "No Longer Reproducible through Manual Testing using the following steps:\n" + "\n" + "# Step1\n# Step2\n# Step3\n" + content,

            "nli": "No Longer Reproducible through Manual Testing following the steps in the description.\n" + content,

            "fani": "FAILED Manual Testing using the following steps:\n" + "\n" + "# Step1\n# Step2\n# Step3\n" + content_fail,

            "fai": "FAILED Manual Testing following the steps in the description.\n" + content_fail,

            "qavr": "Reproduced on:\n" + rep + "\n" + "Explanation.\n",

            "qavnl": "No Longer Reproducible on:\n" + rep + "\n" + "Explanation.\n"
        };

        return templates_qar;
    };
});