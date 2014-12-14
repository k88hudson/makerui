// Utility functions
function loop(n, callback) {
    var els = [];
    for (var i = 0; i < n; i++) {
        els.push(callback(i));
    }
    return els;
}

// Grid!
var DemoRow = React.createClass({
    render: function () {
        var self = this;
        var els = loop(self.props.n, function (i) {
            return <div key={i} className={self.props.className}>Hello!!</div>;
        });
        return <div className="grid">{els}</div>;
    }
});

var Grid = React.createClass({
    render: function () {
        return <div className="grid">{this.props.children}</div>;
    }
});

var Column = React.createClass({
    render: function () {
        var self = this;
        var className = '';
        var classes = [];
        var unitBase = 'unit';
        var breakpoints = ['default', 'portrait', 'landscape', 'sm', 'md', 'lg'];

        breakpoints.forEach(function (breakpoint) {
            var split;
            var breakpointClass;
            if (self.props[breakpoint]) {
                split = self.props[breakpoint].split('/');
                breakpointClass = breakpoint === 'default' ? '' : ('-' + breakpoint);
                classes.push(unitBase + breakpointClass + '-' + split[0] + '-' + split[1]);
            }
        });

        // If no breakpoints were set, just add base 'unit' class
        if (!classes.length) classes.push('unit');

        // Padding
        if (this.props.pad) classes.push('pad');

        // Join!
        className = classes.join(' ');

        // Extra classes
        if (this.props.className) className += (' ' + this.props.className);

        return <div className={className}>{this.props.children}</div>;
    }
});

var GridDemo = React.createClass({
    render: function () {
        return (
            <section id="grid">
                <div className="container">
                    <h1>Grids</h1>
                    <h3>Normal grids</h3>
                    <DemoRow n={6} className="unit-portrait-12-24 unit-sm-6-24 unit-md-4-24" />
                    
                    <h3>Padded grids</h3>
                    <Grid>
                        <Column default="12/24" sm="8/24" pad>This is a cool column</Column>
                        <Column default="12/24" sm="8/24" pad>This is one more column</Column>
                        <Column default="12/24" sm="8/24" pad>This is another column</Column>
                    </Grid>
                </div>
                <h3>Flex</h3>
                <DemoRow n={3} className="unit-12-24 unit-sm-8-24 pad" />
            </section>
        );
    }
});

var TypographyDemo = React.createClass({
    render: function () {
        return (
            <section id="typography" className="container">
                <div className="pad">
                    <h1>This is a great heading</h1>
                    <p className="subheading">This is a great subheading, extending the heading.</p>
                </div>
                <div className="grid">
                    {loop(3, function (i) {
                        return (
                            <div key={i} className="unit-sm-8-24 pad">
                               <h3>This is a great heading</h3>
                               <p className="lead">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Atque ut dignissimos quod! Quisquam, non illo atque veniam
                                reprehenderit sunt, vitae porro excepturi aliquid. Maiores
                                quibusdam quo quod optio, porro expedita.
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="pad">
                    Lorem ipsum dolor sit amet, <a href="#">consectetur adipisicing</a> elit.
                    Atque ut <mark>highlighted text</mark>! Quisquam, non illo atque veniam
                    reprehenderit sunt, <strong>strong text</strong> excepturi aliquid. Maiores
                    quibusdam <em>italic text</em> optio, porro expedita.
                </div>
                <div className="pad">
                    <ul className="list-h">
                        <li>This</li>
                        <li>is</li>
                        <li>a</li>
                        <li>horizontal</li>
                        <li>list</li>
                    </ul>
                </div>
            </section>
        );
    }
});

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
            <button className={className}>{iconEl}{this.props.children}</button>
        );
    }
});

var Icon = React.createClass({
    render: function () {
        return <span className={'ion-' + this.props.type}></span>;
    }
});

// Buttons!
var ButtonsDemo = React.createClass({
    render: function () {
        var fifth = 'unit-sm-1-5 pad';
        return (
            <div id="buttons" className="container">
                <div className="pad">
                    <h1>Buttons</h1>
                    <p>
                        <button className="btn">Hello world!</button> <a href="#" className="btn">Hello world!</a>
                    </p>
                    <ul className="list-h pad-b">
                        <li><Btn>Default</Btn></li>
                        <li><Btn color="white">White</Btn></li>
                        <li><Btn color="link">Link</Btn></li>
                        <li><button className="btn btn-black">Black</button></li>
                        <li><button className="btn btn-red">Danger</button></li>
                        <li><button className="btn btn-orange">Orange</button></li>
                        <li><button className="btn btn-yellow">Warning</button></li>
                        <li><button className="btn btn-green">Success</button></li>
                        <li><button className="btn btn-pink">New</button></li>
                    </ul>
                    <ul className="list-h pad-b">
                        <li><Btn icon="person"> My Account</Btn></li>
                        <li><Btn color="white" icon="chatbox-working">3 messages</Btn></li>
                        <li><Btn color="red" icon="trash-a" /></li>
                        <li><Btn color="white" icon="plus-round" /></li>
                        <li><Btn color="orange" icon="pull-request" /></li>
                        <li><Btn color="pink" icon="pull-request"> Pull requests</Btn></li>
                    </ul>
                </div>
                <div className="grid">
                    <div className={fifth}><Btn block>Block</Btn></div>
                    <div className={fifth}><Btn color="pink" block>Block</Btn></div>
                    <div className={fifth}><Btn color="red" block>Block</Btn></div>
                    <div className={fifth}><Btn color="yellow" icon="trash-a" block>Block</Btn></div>
                    <div className={fifth}><Btn color="white" icon="trash-a" block /></div>
                </div>
            </div>
        );
    }
});


// Demo!
var Demo = React.createClass({
    render: function () {
        return (<div>
            <TypographyDemo />
            <ButtonsDemo />
            <GridDemo />
        </div>);
    }
})

React.render(<Demo />, document.getElementById('demo'));
