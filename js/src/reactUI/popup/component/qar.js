define(function (require, exports) {
    var React = require('react');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var templates = require('comment');

    var comment = require('../../util/comment');
    var dropdown = require('../../util/dropdown');
    var input = require('../../util/input')
    var setting = require('../../../model/setting')

    var qar = require('qar');

    exports.QARBox = function () {
        var EnvironmentBox = React.createClass({
            checkedHandler: function (e) {
                var isChecked = e.target.checked;
                var id = e.target.id;
                var obj = this.state.isChecked;

                obj[id] = isChecked;

                chromeUtil.getLocalStorageSync('parameter_qar')
                    .then(function (err, result) {
                        result.enable_branch = obj;

                        return chromeUtil.setLocalStorageSync({
                            parameter_qar: result
                        })
                    })
                    .then(function () {
                        setting.syncQARComment();
                    });

                this.setState(obj);


            },

            switchHandler: function () {
                this.setState({
                    isPortal: !(this.state.isPortal)
                })
            },

            getDefaultProps: function () {
                return {
                    os: 'Win7',
                    server: 'Tomcat',
                    database: 'Mysql 5.7',
                    browser: 'FF Latest',

                    gitk_70x: '',
                    gitk_71x: '',
                    gitk_master: '',

                    server_70x: '',
                    server_71x: '',
                    server_master: '',

                    enable_branch: {
                        master: true,
                        _71x: true,
                        _70x: true,
                        master_r: true,
                        _71x_r: true,
                        _70x_r: true
                    }
                };
            },

            getInitialState: function () {
                return {
                    isChecked: {
                        master: true,
                        _71x: true,
                        _70x: true,
                        master_r: true,
                        _71x_r: true,
                        _70x_r: true
                    }
                }
            },

            render: function () {
                var portal_branch_detail = [];
                var portal_branch_detail_r = [];

                if (this.state.isChecked.master)
                    portal_branch_detail.push((
                        <div key='master' className='row'>
                            {input.singleInputWithTag('Master')}
                        </div>))

                if (this.state.isChecked._71x)
                    portal_branch_detail.push((
                        <div key='71x' className='row'>
                            {input.singleInputWithTag('7.1.x-Private')}
                        </div>))

                if (this.state.isChecked._71fp)
                    portal_branch_detail.push((
                        <div key='71fp' className='row'>
                            {input.singleInputWithTag('7.1.x-FixPack')}
                        </div>))                        

                if (this.state.isChecked._70x)
                    portal_branch_detail.push((
                        <div key='70x' className='row'>
                            {input.singleInputWithTag('7.0.x-Private')}
                        </div>
                    ))

                if (this.state.isChecked._70fp)
                    portal_branch_detail.push((
                        <div key='70fp' className='row'>
                            {input.singleInputWithTag('7.0.x-FixPack')}
                        </div>
                    ))

                if (this.state.isChecked.master_r)
                    portal_branch_detail_r.push((
                        <div key='master' className='row'>
                            {input.singleInputWithTag('Master(R)')}
                        </div>))

                if (this.state.isChecked._71x_r)
                    portal_branch_detail_r.push((
                        <div key='71x' className='row'>
                            {input.singleInputWithTag('7.1.x-Private(R)')}
                        </div>))

                if (this.state.isChecked._71fp_r)
                    portal_branch_detail_r.push((
                        <div key='71fp' className='row'>
                            {input.singleInputWithTag('7.1.x-FixPack(R)')}
                        </div>))                        

                if (this.state.isChecked._70x_r)
                    portal_branch_detail_r.push((
                        <div key='70x' className='row'>
                            {input.singleInputWithTag('7.0.x-Private(R)')}
                        </div>
                    ))

                if (this.state.isChecked._70fp_r)
                    portal_branch_detail_r.push((
                        <div key='70fp' className='row'>
                            {input.singleInputWithTag('7.0.x-FixPack(R)')}
                        </div>
                    ))                    

                return (
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-xs-10 col-xs-offset-1'>
                                <div className='row'>
                                    <p className='block_title'>Device Detail Setting</p>
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('OS', qar.os_options, this.props.os)}
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('Server', qar.server_options, this.props.server)}
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('DataBase', qar.db_options, this.props.database)}
                                </div>
                                <div className='row'>
                                    {dropdown.singleButtonDropDown('Browser', qar.browser_options, this.props.browser)}
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-xs-10 col-xs-offset-1'>
                                <div className='row'>
                                    <p className='block_title'>Portal Detail
                                        Setting</p>
                                </div>
                                <div className='row'>
                                    <dt>Reproduced Portal Version</dt>
                                    <dd>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='master_r' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked.master_r}> Master</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_71x_r' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._71x_r}> 7.1.x-Private</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_71fp_r' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._71fp_r}> 7.1.x-FixPack</input>
                                        </label>                                        
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_70x_r' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._70x_r}> 7.0.x-Private</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_70fp_r' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._70fp_r}> 7.0.x-FixPack</input>
                                        </label>                                        
                                    </dd>
                                </div>
                                {portal_branch_detail_r}
                                <div className='row'>
                                    <dt>Fixed Portal Version</dt>
                                    <dd>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='master' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked.master}> Master</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_71x' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._71x}> 7.1.x-Private</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_71fp' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._71fp}> 7.1.x-FixPack</input>
                                        </label>                                        
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_70x' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._70x}> 7.0.x-Private</input>
                                        </label>
                                        <label className="checkbox-inline">
                                            <input type="checkbox" id='_70fp' onChange={this.checkedHandler}
                                                   checked={this.state.isChecked._70fp}> 7.0.x-FixPack</input>
                                        </label>                                        
                                    </dd>
                                </div>
                                {portal_branch_detail}
                            </div>
                        </div>
                    </div>
                );
            },

            componentDidMount: function () {
                chromeUtil.getLocalStorageSync('parameter_qar')
                    .then(function (err, result) {
                        if (!result)
                            return chromeUtil.setLocalStorageSync({
                                parameter_qar: this.props
                            })
                        else {
                            this.setState({
                                isChecked: result.enable_branch
                            })
                        }

                    }.bind(this));
            }
        })

        var QARCommentTitleBox = React.createClass({
            render: function () {
                return (
                    <div className='row'>
                        <EnvironmentBox/>

                        <p className='block_title'>QA-R Comment List</p>
                    </div>
                )
            }
        });

        var QARCommentListBox = React.createClass({
            getDefaultProps: function () {
                return {
                    team: 'qar'
                }
            },

            getInitialState: function () {
                return {
                    rows: []
                }
            },

            render: function () {
                return (
                    <div className='row'>
                        <QARCommentTitleBox/>
                        {comment.CommentBox(this.props.team, this.state.rows)}
                    </div>
                )
            },

            componentDidMount: function () {
                var template = templates.templates_qar;

                chromeUtil.getLocalStorageSync("qar_obj")
                    .then(function (err, result) {
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

                            chromeUtil.setLocalStorage({'qar_obj': obj}, function () {
                                console.log("Initiate qar obj to %o successfully.", obj)
                                this.setState({rows: rows});
                            }.bind(this));
                        } else {
                            for (e in result) {
                                if (result.hasOwnProperty(e))
                                    rows.push(result[e])
                            }

                            this.setState({rows: rows});
                        }

                    }.bind(this));
            }
        });

        return (
            <QARCommentListBox/>
        )
    };

});