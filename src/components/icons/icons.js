var React = require('react');
var Icon = React.createClass({
    render: function () {
        return <span className={'ion-' + this.props.type}></span>;
    }
});

module.exports = Icon;
