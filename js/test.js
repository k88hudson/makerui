var React = require('react');

var Whatever = React.createClass({
    render: function() {
        return <div />
    }
});

var obj = {y: 'whatever', z: 'whatever', something: 'yes'};

{x, ...other} = obj;
