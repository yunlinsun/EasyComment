define(function (require, exports) {
    exports.os_options = ['WinXP', 'Win7', 'Ubuntu', 'CentOS'];
    exports.server_options = ['Tomcat','JBoss','TCServer','Glassfish','Weblogic','Websphere'];
    exports.db_options = ['Mysql 5.7','MySQL 5.6','Oracle 10g','Oracle 11g'];
    exports.browser_options = ['IE11','Chrome Latest','FireFox Latest'];
    exports.server_versions={
        Tomcat:['7.0.62','8.0.53','9.0.10'],
        JBoss:['EAP 5.1.2','EAP 6.0','EAP 6.1', '7.0'],
        TCServer:['2.6','2.9.3'],
        Glassfish:['v2','v3'],
        Weblogic:['v10','v12'],
        Websphere:['v7.0','v8.5']
    }
});
