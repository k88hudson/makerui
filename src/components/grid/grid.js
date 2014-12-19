var React = require('react');

var Grid = React.createClass({
    render: function () {
        var classList = 'grid';
        if (this.props.flush) classList += ' grid-flush';
        if (this.props.className) classList += (' ' + this.props.className);
        return <div className={classList}>{this.props.children}</div>;
    }
});

var Column = React.createClass({
    render: function () {
        var self = this;
        var className = '';
        var classes = [];
        var unitBase = 'unit';
        var breakpoints = ['base', 'portrait', 'landscape', 'sm', 'md', 'lg'];

        breakpoints.forEach(function (breakpoint) {
            var split;
            var breakpointClass;
            if (self.props[breakpoint]) {
                split = self.props[breakpoint].split('/');
                breakpointClass = breakpoint === 'base' ? '' : ('-' + breakpoint);
                classes.push(unitBase + breakpointClass + '-' + split[0] + '-' + split[1]);
            }
        });

        // If no breakpoints were set, just add base 'unit' class
        if (!classes.length) classes.push('unit');

        // Join!
        className = classes.join(' ');

        // Extra classes
        if (this.props.className) className += (' ' + this.props.className);

        return <div className={className}>{this.props.children}</div>;
    }
});

module.exports = {
    Grid: Grid,
    Column: Column
};
