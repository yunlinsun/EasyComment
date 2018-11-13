'use strict';

function WikiNode() {
    this.form_71 = {
        groupId: 20182,
        name: 'Main'
    };
}

WikiNode.prototype = {
    getWikiNode: function getWikiNode(obj, callback) {
        invoke('/wikinode/get-nodes', obj, false, callback);
    },

    createWikiNode: function createWikiNode(obj, callback) {
        var payload = {
            name: obj.name,
            description: 'TestDescription',
            number: obj.number,
            basename: obj.basename
        };

        invoke('/wikinode/add-node', payload, true, callback);
    }
};

function WikiPage() {
    this.form_71 = {
        nodeId: 20809,
        title: 'Test Title',
        content: 'Test Content',
        summary: 'Test Summary',
        minorEdit: true
    };
}

WikiPage.prototype = {
    createWikiPage: function createWikiPage(obj, callback) {
        this.form_71.nodeId = obj.nodeId;
        this.form_71.title = obj.name;

        invoke('/wikipage/add-page', this.form_71, true, callback);
    }
};