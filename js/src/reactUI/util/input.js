define(function (require, exports) {
    var bootstrap = require('bootstrap');
    var React = require('react');
    var $ = require('jquery');

    var chromeUtil = require('chromeUtil').chromeLocalStorage;

    var dropdown = require('../util/dropdown');

    var qar = require('qar');

    var bridge = new Map(
        [
            ['Master', 'gitk_master'],
            ['7.1.x-Private', 'gitk_71x'],
            ['7.1.x-FixPack', 'gitk_71fp'],
            ['7.0.x-Private', 'gitk_70x'],
            ['7.0.x-FixPack', 'gitk_70fp'],
            ['Master(R)', 'gitk_master_r'],
            ['7.1.x-Private(R)', 'gitk_71x_r'],
            ['7.1.x-FixPack(R)', 'gitk_71fp_r'],
            ['7.0.x-Private(R)', 'gitk_70x_r'],
            ['7.0.x-FixPack(R)', 'gitk_70fp_r'],
        ]
    );

    var SingleInputWithTag = React.createClass({
        changeHandler: function () {
            var tag = this.refs.PS_tag.getDOMNode();
            var value = this.refs.PS_value.getDOMNode().value;

            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    result[bridge.get($(tag).text())] = value
                    return chromeUtil.setLocalStorageSync({
                        parameter_qar: result
                    })
                });
        },

        getDefaultProps: function () {
            return {
                tag: 'Master',
                menu: ['version1', 'version2', 'version3']
            }
        },

        getInitialState: function () {
            return {
                value: this.props.value
            }
        },

        render: function () {
            return (
                <div className="input-group col-xs-12">
                    <span ref='PS_tag' className="input-group-addon">{this.props.tag}</span>
                    <input ref='PS_value' type="text" className="form-control"
                           placeholder={this.props.tag+' Git ID'} onChange={this.changeHandler}>
                    </input>

                    <div className='input-group-btn'>
                        {dropdown.singleButtonDropDownAddOn(this.props.tag, this.props.menu)}
                    </div>
                </div>
            )
        },

        componentDidMount: function () {
            chromeUtil.getLocalStorageSync('parameter_qar')
                .then(function (err, result) {
                    var tag = this.refs.PS_tag.getDOMNode();
                    this.refs.PS_value.getDOMNode().value = result[bridge.get($(tag).text())];
                    this.setState({
                        menu: qar.server_versions[result.server]
                    })
                }.bind(this));
        }
    });

    exports.singleInputWithTag = function (tag, defaultValue) {
        return <SingleInputWithTag tag={tag} value={defaultValue}/>
    };
});


