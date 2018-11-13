'use strict';

function Pages() {
    this.form_71 = {
        groupId: 20182,
        privateLayout: false,
        parentLayoutId: 0,
        name: '',
        title: '',
        description: '',
        type: 'portlet',
        hidden: false,
        friendlyURL: ''
    };
}

Pages.prototype = {
    createPublicPages: function createPublicPages(obj) {
        var name = obj.name;
        var friendlyURL = '/' + name;
        var groupId = obj.groupId;

        this.form_71.name = name;
        this.form_71.friendlyURL = friendlyURL;
        this.form_71.groupId = groupId;

        invoke('/layout/add-layout', this.form_71, true);
    },

    createPublicPagesWithChild: function createPublicPagesWithChild(obj, callback) {
        var name = obj.name;
        var friendlyURL = '/' + name;
        var groupId = obj.groupId;

        this.form_71.name = name;
        this.form_71.friendlyURL = friendlyURL;
        this.form_71.groupId = groupId;
        this.form_71.number_sub = obj.number_sub;
        this.form_71.basename_sub = obj.basename_sub;

        if (!obj.isWithChild) {
            this.form_71.isWithChild = false;
            this.form_71.parentLayoutId = obj.parentLayoutId;
        }

        invoke('/layout/add-layout', this.form_71, true, callback);
    }
};