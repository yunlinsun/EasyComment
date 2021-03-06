function MBCategory() {
    this.form_71 = {
        userId: 20199,
        parentCategoryId: 0,
        name: 'TestCategory',
        description: 'TestDescription'
    }
}

MBCategory.prototype = {
    getCategoryBySiteId: function (obj, callback) {
        invoke('/mbcategory/get-categories', obj, false, callback);
    },

    createCategory: function (obj, callback) {
        this.form_71.userId = obj.userId;
        this.form_71.name = obj.name;
        this.form_71.number = obj.number;
        this.form_71.basename=obj.basename;

        invoke('/mbcategory/add-category', this.form_71, true, callback);
    }
};

function MBThread() {
    this.form_71 = {
        groupId: 20182,
        categoryId: 0,
        subject: 'TestSubject',
        body: 'TestBody',
        format: 'bbcode',
        inputStreamOVPs: '[]',
        anonymous: true,
        priority: 0,
        allowPingbacks: true
    }
}

MBThread.prototype = {
    createMBTreadOnRoot: function (obj, callback) {
        this.form_71.groupId = obj.groupId;
        this.form_71.subject = obj.name;

        invoke('/mbmessage/add-message', this.form_71, true, callback);
    },

    createMBTreadOnCategory:function(obj,callback) {
        var payload={
            categoryId: obj.categoryId,
            subject: obj.name,
            body: 'TestBody'
        }

        invoke('/mbmessage/add-message', payload, true, callback);

    }
}
