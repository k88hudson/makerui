var React = require('react');
var Btn = require('../src/components/buttons/buttons');
var Icon = require('../src/components/icons/icons');

module.exports = React.createClass({
    render: function () {
        var bricks = [
            <span>This is a block</span>,
            <span>This is a block</span>,
            <span>This is a block</span>,
            <span>This is a block</span>
        ].map(function (brick) {
            return (<div className="brick">{brick}
                <div className="sort">
                    <Btn color="link" icon="drag" />
                </div>
            </div>);
        });

        return (<div>
            <div className="bricks">
                {bricks}
            </div>
        </div>);
    }
});

