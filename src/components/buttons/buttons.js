var React = require('react');
var Icon = require('../icons/icons');

var Btn = React.createClass({
    render: function () {
        var className = 'btn';
        var iconEl;

        if (this.props.color) className += (' btn-' + this.props.color);
        if (this.props.icon && !this.props.children) className += ' btn-icon';
        if (this.props.block) className += ' btn-block';
        if (this.props.className) className += (' ' + this.props.ClassName);

        if (this.props.icon) iconEl = <Icon type={this.props.icon} />;
        return (
            <button className={className} onClick={this.props.onClick}>
                {iconEl}{this.props.children}
            </button>
        );
    }
});

module.exports = Btn;
