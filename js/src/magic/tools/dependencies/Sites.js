function Sites() {
    this.form_71x = {
        parentGroupId: 0,
        liveGroupId: 0,
        name: '',
        description: '',
        type: 1,
        manualMembership: true,
        membershipRestriction: 0,
        friendlyURL: '',
        site: true,
        active: true
    }
}

Sites.prototype = {
    createBasicSites: function (obj) {
        var name = obj.name;
        var parentGroupId = obj.parentId;

        this.form_71x.name = name;

        if (parentGroupId != '' && parentGroupId)
            this.form_71x.parentGroupId = parentGroupId;

        invoke('/group/add-group', this.form_71x, true);

    },

    getSitesByCompanyId: function (companyId, parentGroupId, callback) {
        invoke('/group/get-groups', {
                companyId: companyId,
                parentGroupId: parentGroupId ? parentGroupId : 0,
                site: true
            }, false, callback
        );
    }
}


