$(document).ready(function () {
    bindToComment('#comment', function (result) {
        if (!result.team) {
            setLocalStorage({'team': 'qar'}, function () {
                console.log("Easy Comment initialize team to %s successfully.", 'qar');
            });
        }
        else {
            if (result.team == 'fp') {
                alert("Your team setting is fixpack,but the current page is qa-r LPS page, please set team to qa-r.");
            }
            else if (result.team == 'qar') {
                getLocalStorage("parameter_qar", function (result) {
                    var obj = result.parameter_qar;
                    commentTemplate(obj);
                });
            }
            else {
                alert("Please set Your team in right-top setting page.");
            }
        }
    })
});

function commentTemplate(obj) {
    var metadata = {
        server_master: obj.server_master ? obj.server + ' ' + obj.server_master : 'Master Server',
        server_71: obj.server_71x ? obj.server + ' ' + obj.server_71x : '7.1.x Server',
        server_61: obj.server_61x ? obj.server + ' ' + obj.server_61x : '6.1.x Server',

        server_master_r: obj.server_master_r ? obj.server + ' ' + obj.server_master_r : 'Master(R) Server',
        server_71_r: obj.server_71x_r ? obj.server + ' ' + obj.server_71x_r : '7.1.x(R) Server',
        server_61_r: obj.server_61x_r ? obj.server + ' ' + obj.server_61x_r : '6.1.x(R) Server',

        db: obj.database ? obj.database : 'Mysql 5.7.xx',
        gitk_master: obj.gitk_master ? obj.gitk_master : 'GIT ID of master branch',
        gitk_71x: obj.gitk_71x ? obj.gitk_71x : 'GIT ID of 62 branch',
        gitk_61x: obj.gitk_61x ? obj.gitk_61x : 'GIT ID of 61 branch',
        gitk_master_r: obj.gitk_master_r ? obj.gitk_master_r : 'GIT ID of master(R) branch',
        gitk_71x_r: obj.gitk_71x_r ? obj.gitk_71x_r : 'GIT ID of 62(R) branch',
        gitk_61x_r: obj.gitk_61x_r ? obj.gitk_61x_r : 'GIT ID of 61(R) branch'
    };

    comment_compile(metadata, 'qar_obj');
}
