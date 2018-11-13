function Users() {
    this.form_71x = {
        companyId: '20155',
        autoPassword: true,
        password1: 'password',
        password2: 'password',
        autoScreenName: true,
        screenName: '',
        emailAddress: '',
        facebookId: 0,
        openId: '',
        locale: '',
        firstName: '',
        middleName: '',
        lastName: '',
        prefixId: 0,
        suffixId: 0,
        male: true,
        birthdayMonth: 0,
        birthdayDay: 1,
        birthdayYear: 1970,
        jobTitle: '',
        groupIds: null,
        organizationIds: null,
        roleIds: null,
        userGroupIds: null,
        sendEmail: true
    };
};

Users.prototype = {
    createBasicUser_71x: function (obj) {
        var name = obj.name;
        var roleId = obj.roleId;
        var siteId = obj.siteId;
        var orgId = obj.orgId;

        this.form_71x.screenName = name;
        this.form_71x.emailAddress = name + '@liferay.com';
        this.form_71x.firstName = name;

        if (roleId != '' && roleId)
            this.form_71x.roleIds = roleId;

        if (siteId != '' && siteId)
            this.form_71x.groupIds = siteId;

        if (orgId != '' && orgId)
            this.form_71x.organizationIds = orgId;

        invoke('/user/add-user', this.form_71x, true);
    },

    getUesrByScreenName: function (obj, callback) {
        var payload = {
            companyId: obj.companyId,
            screenName: obj.screenName
        }

        invoke('/user/get-user-by-screen-name', payload, false, callback)

    },

    getUsersByCompanyId: function(obj,callback) {
        var payload={
            companyId: obj.companyId,
            start: -1,
            end: -1
        }

        invoke('/user/get-company-users', payload, false, callback);
    }
}

function UsersGroups() {}

UsersGroups.prototype = {
    assignUsers: function (obj) {
        var payload={
            userGroupId: obj.userGroupId,
            userIds: obj.userIds
        }

        invoke('/user/add-user-group-users', payload,true)
    }
}

