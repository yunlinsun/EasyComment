define(function (require, exports) {
    var bootstrap = require('bootstrap');
    var React = require('react');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var qar = require('qar');

    var bridge = new Map(
        [
            ['Master', 'master'],
            ['7.1.x-Private', '71x'],
            ['7.1.x-FixPack', '71fp'],
            ['7.0.x-Private', '70x'],
            ['7.0.x-FixPack', '70fp'],
            ['Master(R)', 'master_r'],
            ['7.1.x-Private(R)', '71x_r'],
            ['7.1.x-FixPack(R)', '71fp_r'],
            ['7.0.x-Private(R)', '70x_r'],
            ['7.0.x-FixPack(R)', '70x_fp']
        ]
    )

    var SingleButtonDropDown = React.createClass({
        chooseHandler: function (e) {
            var id = this.refs.ES_title.getDOMNode().id.toLowerCase();
            var value = $(e.target).text();
            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    result[id] = value
                    return chromeUtil.setLocalStorageSync({
                        parameter_qar: result
                    })
                });

            this.setState({
                value: value
            })
        },

        getDefaultProps: function () {
            return {
                title: 'OS',
                menu: ['option1', 'option2', 'option3']
            }
        },

        getInitialState: function () {
            return {
                value: this.props.value
            }
        },

        render: function () {
            var rows = [];

            this.props.menu.forEach(function (c, i) {
                var row = (
                    <li key={'env_'+i} onClick={this.chooseHandler}><a href='#'><p className="text-center">{c}</p>
                    </a>
                    </li>)

                rows.push(row);
            }.bind(this));

            return (
                <div className="btn-group  col-xs-12">
                    <button ref='ES_title' id={this.props.title} type="button"
                            className="btn btn-default col-xs-11"
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        {this.props.title}
                        (<strong><u>{this.state.value}</u></strong>)
                    </button>
                    <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu col-xs-11">
                        {rows}
                    </ul>
                </div>
            )
        },

        componentDidMount: function () {
            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    var default_qar_obj = {
                        os: 'Win7 64x',
                        server: 'Tomcat 9.0.10',
                        database: 'Mysql 5.7',
                        browser: 'FF Latest'
                    }

                    if (!result)
                        return chromeUtil.setLocalStorageSync({
                            parameter_qar: default_qar_obj
                        })
                    else {
                        var id = this.refs.ES_title.getDOMNode().id.toLowerCase();
                        this.setState({
                            value: result[id]
                        })
                    }


                }.bind(this));
        }
    })

    exports.singleButtonDropDown = function (title, menuList, currentValue, eventHandler) {
        return <SingleButtonDropDown title={title} menu={menuList} value={currentValue}/>
    };

    var SingleButtonDropDownAddOn = React.createClass({
        clickHandler: function () {
            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    this.setState({
                        menu: qar.server_versions[result.server]
                    });

                }.bind(this));
        },

        chooseHandler: function (e) {
            var id = this.refs.ES_title.getDOMNode().id.toLowerCase();
            var value = $(e.target).text();

            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    result[id] = value
                    return chromeUtil.setLocalStorageSync({
                        parameter_qar: result
                    })
                });

            this.setState({
                value: value
            })
        },

        getDefaultProps: function () {
            return {
                title: 'Server',
                menu: ['version1', 'version2', 'version3']
            }
        },

        getInitialState: function () {
            return {
                value: this.props.value,
                menu: ['version1', 'version2', 'version3']
            }
        },

        render: function () {
            var rows = [];

            if(this.state.menu)
            this.state.menu.forEach(function (c, i) {
                var row = (
                    <li key={'env_'+i} onClick={this.chooseHandler}><a href='#'><p className="text-center">{c}</p>
                    </a>
                    </li>)

                rows.push(row);
            }.bind(this));

            return (
                <div className="input-group-btn">
                    <button ref='ES_title' id={'server_'+bridge.get(this.props.title)} onClick={this.clickHandler}
                            type="button"
                            className="btn btn-default col-xs-11"
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        (<strong><u>{this.state.value}</u></strong>)
                    </button>
                    <button type="button" className="btn btn-danger dropdown-toggle" onClick={this.clickHandler}
                            data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu col-xs-11">
                        {rows}
                    </ul>
                </div>
            )
        },

        componentDidMount: function () {
            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    var default_qar_obj = {
                        os: 'Win7 64x',
                        server: 'Tomcat 9.0.10',
                        database: 'Mysql 5.7',
                        browser: 'FF Latest'
                    }

                    if (!result)
                        return chromeUtil.setLocalStorageSync({
                            parameter_qar: default_qar_obj
                        })
                    else {
                        var id = this.refs.ES_title.getDOMNode().id.toLowerCase();
                        this.setState({
                            value: result[id]
                        })
                    }


                }.bind(this));
        }
    })

    exports.singleButtonDropDownAddOn = function (title, menuList, currentValue, eventHandler) {
        return <SingleButtonDropDownAddOn title={title} menu={menuList} value={currentValue}/>
    };
});
