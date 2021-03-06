'use strict';

define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');

    var comment = require('../../util/comment');
    var dropdown = require('../../util/dropdown');
    var input = require('../../util/input');
    var setting = require('../../../model/setting');

    var qar = require('qar');

    exports.QARBox = function () {
        var EnvironmentBox = React.createClass({
            displayName: 'EnvironmentBox',

            checkedHandler: function checkedHandler(e) {
                var isChecked = e.target.checked;
                var id = e.target.id;
                var obj = this.state.isChecked;

                obj[id] = isChecked;

                chromeUtil.getLocalStorageSync('parameter_qar').then(function (err, result) {
                    result.enable_branch = obj;

                    return chromeUtil.setLocalStorageSync({
                        parameter_qar: result
                    });
                }).then(function () {
                    setting.syncQARComment();
                });

                this.setState(obj);
            },

            switchHandler: function switchHandler() {
                this.setState({
                    isPortal: !this.state.isPortal
                });
            },

            getDefaultProps: function getDefaultProps() {
                return {
                    os: 'Win7',
                    server: 'Tomcat',
                    database: 'Mysql 5.7',
                    browser: 'FF Latest',

                    gitk_70x: '',
                    gitk_71x: '',
                    gitk_71fp: '',
                    gitk_70fp: '',
                    gitk_master: '',

                    server_70x: '',
                    server_71x: '',
                    server_71fp: '',
                    server_70fp: '',
                    server_master: '',

                    enable_branch: {
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
                    }
                };
            },

            getInitialState: function getInitialState() {
                return {
                    isChecked: {
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
                    }
                };
            },

            render: function render() {
                var portal_branch_detail = [];
                var portal_branch_detail_r = [];

                if (this.state.isChecked.master) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: 'master', className: 'row' },
                    input.singleInputWithTag('Master')
                ));

                if (this.state.isChecked._71x) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '71x', className: 'row' },
                    input.singleInputWithTag('7.1.x-Private')
                ));

                if (this.state.isChecked._71fp) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '71fp', className: 'row' },
                    input.singleInputWithTag('7.1.x-Fixpack')
                ));                    

                if (this.state.isChecked._71fp) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '71fp', className: 'row' },
                    input.singleInputWithTag('7.1.x-Fixpack')
                )); 

                if (this.state.isChecked._70fp) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '70fp', className: 'row' },
                    input.singleInputWithTag('7.0.x-Fixpack')
                ));                                    

                if (this.state.isChecked._70fp) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '70fp', className: 'row' },
                    input.singleInputWithTag('7..x-Fixpack')
                ));

                if (this.state.isChecked._70x) portal_branch_detail.push(React.createElement(
                    'div',
                    { key: '70x', className: 'row' },
                    input.singleInputWithTag('7.0.x-Private')
                ));

                if (this.state.isChecked.master_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: 'master', className: 'row' },
                    input.singleInputWithTag('Master(R)')
                ));

                if (this.state.isChecked._71x_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '71x', className: 'row' },
                    input.singleInputWithTag('7.1.x-Private(R)')
                ));

                if (this.state.isChecked._71fp_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '71fp', className: 'row' },
                    input.singleInputWithTag('7.1.x-Fixpack(R)')
                ));    

                if (this.state.isChecked._71fp_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '71fp', className: 'row' },
                    input.singleInputWithTag('7.1.x-Fixpack(R)')
                ));

                if (this.state.isChecked._70fp_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '70fp', className: 'row' },
                    input.singleInputWithTag('7.0.x-Fixpack(R)')
                ));    

                if (this.state.isChecked._70fp_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '70fp', className: 'row' },
                    input.singleInputWithTag('7.0.x-Fixpack(R)')
                ));                                     

                if (this.state.isChecked._70x_r) portal_branch_detail_r.push(React.createElement(
                    'div',
                    { key: '70x', className: 'row' },
                    input.singleInputWithTag('7.0.x-Private(R)')
                ));

                return React.createElement(
                    'div',
                    { className: 'container-fluid' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-10 col-xs-offset-1' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'p',
                                    { className: 'block_title' },
                                    'Device Detail Setting'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('OS', qar.os_options, this.props.os)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('Server', qar.server_options, this.props.server)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('DataBase', qar.db_options, this.props.database)
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                dropdown.singleButtonDropDown('Browser', qar.browser_options, this.props.browser)
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-10 col-xs-offset-1' },
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'p',
                                    { className: 'block_title' },
                                    'Portal Detail Setting'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'dt',
                                    null,
                                    'Reproduced Portal Version'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: 'master_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked.master_r },
                                            ' Master'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_71x_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._71x_r },
                                            ' 7.1.x-Private'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_71fp_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._71fp_r },
                                            ' 7.1.x-Fixpack'
                                        )
                                    ),                                    
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_70x_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._70x_r },
                                            ' 7.0.x-Private'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_70fp_r', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._70fp_r },
                                            ' 7.0.x-Fixpack'
                                        )
                                    )                                    
                                )
                            ),
                            portal_branch_detail_r,
                            React.createElement(
                                'div',
                                { className: 'row' },
                                React.createElement(
                                    'dt',
                                    null,
                                    'Fixed Portal Version'
                                ),
                                React.createElement(
                                    'dd',
                                    null,
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: 'master', onChange: this.checkedHandler,
                                                checked: this.state.isChecked.master },
                                            ' Master'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_71x', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._71x },
                                            ' 7.1.x-Private'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_71fp', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._71fp },
                                            ' 7.1.x-Fixpack'
                                        )
                                    ),                                    
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_70x', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._70x },
                                            ' 7.0.x-Private'
                                        )
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'checkbox-inline' },
                                        React.createElement(
                                            'input',
                                            { type: 'checkbox', id: '_70fp', onChange: this.checkedHandler,
                                                checked: this.state.isChecked._70fp },
                                            ' 7.1.x-Fixpack'
                                        )
                                    )                                    
                                )
                            ),
                            portal_branch_detail
                        )
                    )
                );
            },

            componentDidMount: function componentDidMount() {
                chromeUtil.getLocalStorageSync('parameter_qar').then((function (err, result) {
                    if (!result) return chromeUtil.setLocalStorageSync({
                        parameter_qar: this.props
                    });else {
                        this.setState({
                            isChecked: result.enable_branch
                        });
                    }
                }).bind(this));
            }
        });

        var QARCommentTitleBox = React.createClass({
            displayName: 'QARCommentTitleBox',

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(EnvironmentBox, null),
                    React.createElement(
                        'p',
                        { className: 'block_title' },
                        'QA-R Comment List'
                    )
                );
            }
        });

        var QARCommentListBox = React.createClass({
            displayName: 'QARCommentListBox',

            getDefaultProps: function getDefaultProps() {
                return {
                    team: 'qar'
                };
            },

            getInitialState: function getInitialState() {
                return {
                    rows: []
                };
            },

            render: function render() {
                return React.createElement(
                    'div',
                    { className: 'row' },
                    React.createElement(QARCommentTitleBox, null),
                    comment.CommentBox(this.props.team, this.state.rows)
                );
            },

            componentDidMount: function componentDidMount() {
                var template = templates.templates_qar;

                chromeUtil.getLocalStorageSync("qar_obj").then((function (err, result) {
                    var e;
                    var rows = [];

                    if (!result) {
                        var obj = {};

                        for (e in template) {
                            if (template.hasOwnProperty(e)) {
                                obj[e] = {
                                    id: e,
                                    key: e,
                                    des: templates.descriptions_qar[e],
                                    template: template[e]
                                };

                                rows.push(obj[e]);
                            }
                        }

                        chromeUtil.setLocalStorage({ 'qar_obj': obj }, (function () {
                            console.log("Initiate qar obj to %o successfully.", obj);
                            this.setState({ rows: rows });
                        }).bind(this));
                    } else {
                        for (e in result) {
                            if (result.hasOwnProperty(e)) rows.push(result[e]);
                        }

                        this.setState({ rows: rows });
                    }
                }).bind(this));
            }
        });

        return React.createElement(QARCommentListBox, null);
    };
});