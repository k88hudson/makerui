var React = require('react');

// Utility functions
function loop(n, callback) {
    var els = [];
    for (var i = 0; i < n; i++) {
        els.push(callback(i));
    }
    return els;
}

React.initializeTouchEvents(true)

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
        var classList = ['grid'];
        if (this.props.flush) classList.push('grid-flush');
        return <div className={classList.join(' ')}>{this.props.children}</div>;
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
                        <Column base="12/24" sm="8/24">This is a cool column</Column>
                        <Column base="12/24" sm="8/24">This is one more column</Column>
                        <Column base="12/24" sm="8/24">This is another column</Column>
                    </Grid>
                </div>
                <h3>Flex</h3>
                <Grid flush>
                    <Column base="12/24" sm="8/24">This is a cool column</Column>
                    <Column base="12/24" sm="8/24">This is one more column</Column>
                    <Column base="12/24" sm="8/24">This is another column</Column>
                </Grid>
            </section>
        );
    }
});

var TypographyDemo = React.createClass({
    render: function () {
        return (
            <section id="typography" className="container">
                <h1>This is a great heading</h1>
                <p className="subheading">This is a great subheading, extending the heading.</p>
    
                <div className="grid">
                    {loop(3, function (i) {
                        return (
                            <div key={i} className="unit-sm-8-24">
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
                <p>
                    Lorem ipsum dolor sit amet, <a href="#">consectetur adipisicing</a> elit.
                    Atque ut <mark>highlighted text</mark>! Quisquam, non illo atque veniam
                    reprehenderit sunt, <strong>strong text</strong> excepturi aliquid. Maiores
                    quibusdam <em>italic text</em> optio, porro expedita.
                </p>
                <ul className="list-h">
                    <li>This</li>
                    <li>is</li>
                    <li>a</li>
                    <li>horizontal</li>
                    <li>list</li>
                </ul>
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
            <button className={className} onClick={this.props.onClick}>{iconEl}{this.props.children}</button>
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
        var fifth = 'unit-sm-1-5';
        return (
            <div id="buttons" className="container">
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

var Checkbox = React.createClass({
    render: function () {
        var classList = ['checkbox'];
        var errEl;
        if (this.props.err) {
            errEl = <div className="err-message">{this.props.err}</div>
            classList.push('err');
        }
        return (
            <div className={classList.join(' ')}>
                <label for={this.props.name}>
                    <input name={this.props.name} type="checkbox" />
                    {this.props.children}
                </label>
                {errEl}
            </div>
        );
    }
});

var Radio = React.createClass({
    render: function () {
        var self = this;
        var name = self.props.name;
        var classList = ['radio'];
        var errEl;
        if (this.props.err) {
            errEl = <div className="err-message">{this.props.err}</div>
            classList.push('err');
        }
        function createOption(data, i) {
            var label;
            var val;
            if (typeof data === 'string') {
                label = data;
                val = data;
            } else {
                label = data.label;
                val = data.val;
            }
            return (<label for={name}>
                <input type="radio" name={name} id={name + i} val={val} />
                {label}
            </label>);
        }
        return (
            <div className={classList.join(' ')}>
                {this.props.options.map(createOption)}
                {errEl}
            </div>
        );
    }
});

var FormsDemo = React.createClass({
    render: function () {
        var provinces = [
            {'short':'AB','name':'Alberta','country':'CA'},
            {'short':'BC','name':'British Columbia','country':'CA'},
            {'short':'LB','name':'Labrador','country':'CA'},
            {'short':'MB','name':'Manitoba','country':'CA'},
            {'short':'NB','name':'New Brunswick','country':'CA'},
            {'short':'NF','name':'Newfoundland','country':'CA'},
            {'short':'NS','name':'Nova Scotia','country':'CA'},
            {'short':'NU','name':'Nunavut','country':'CA'},
            {'short':'NW','name':'Northwest Territories','country':'CA'},
            {'short':'ON','name':'Ontario','country':'CA'},
            {'short':'PE','name':'Prince Edward Island','country':'CA'},
            {'short':'QC','name':'Quebec','country':'CA'},
            {'short':'SK','name':'Saskatchewen','country':'CA'},
            {'short':'YU','name':'Yukon','country':'CA'}
        ];

        return (<section id="forms" className="container">
                <h1>Forms</h1>
                <form className="form">
                    <Grid>
                        <Column sm="16/24">
                            <fieldset className="fieldset">
                                <h3 className="form-title">Shipping information</h3>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input name="name" />
                                </div>
                                <div className="form-group no-margin">
                                    <label>Address</label>
                                    <Grid>
                                        <Column landscape="3/5" md="4/5">
                                            <input name="ship-address" placeholder="Street number and name *" />
                                        </Column>
                                        <Column landscape="2/5" md="1/5">
                                            <input name="unit" placeholder="Unit" />
                                        </Column>
                                        <Column landscape="3/5">
                                            <input name="city" placeholder="City *" value="Katelandia" className="err" />
                                            <div className="err-message">Oops! That is not a real city.</div>
                                        </Column>
                                        <Column landscape="2/5">
                                            <select name="province">
                                                <option selected>Province or Territory *</option>
                                                {provinces.map(function (data) {
                                                    return <option>{data.name}</option>;
                                                })}
                                            </select>
                                        </Column>
                                    </Grid>
                                </div>
                                <div className="form-group">
                                    <label>Phone number</label>
                                    <input />
                                </div>
                                <div className="form-group">
                                    <Btn>Submit</Btn>
                                </div>
                            </fieldset>
                            <fieldset className="fieldset">
                                <h3 className="form-title">Comment</h3>
                                <div className="form-group">
                                    <label>Leave us a comment</label>
                                    <textarea></textarea>
                                </div>
                                <div className="form-group">
                                    <textarea className="err"></textarea>
                                    <div className="err-message">Oops, what?</div>
                                </div>
                                <Checkbox name="water">Want some water?</Checkbox>
                                <Radio name="fruit" options={['Apple', 'Orange', 'Banana']} />
                                <Checkbox name="water" err="Oops, what?">Want some water?</Checkbox>
                            </fieldset>
                        </Column>
                    </Grid>
                </form>
        </section>);
    }
});

var Swiper = require('react-swiper');

var DemoNav = React.createClass({
    render: function () {
        var links = [
            'Documentation',
            'CSS Base',
            'CSS Components',
            'React is cool. Shall we try wrapping to the next line?'
        ];
        return (<ul className="nav">
            <li><span className="nav-title">Sections</span></li>
            {links.map(function (link) {
                return <li><a href="#">{link}</a></li>;
            })}
        </ul>);
    }
});

var Reveal = React.createClass({
    getInitialState: function () {
        return {
            on: false
        };
    },
    exitMenu: function() {
        if (!this.state.on) return;
        this.setState({ on: false });
    },
    onSwipe: function (e) {
        if (e.type === 'swipeLeft') {
            this.setState({ on: false });
        } else if (e.type === 'swipeRight') {
            this.setState({ on: true });
        }
    },
    onMenuToggle: function (e) {
        e.preventDefault();
        this.setState({
            on: !this.state.on
        });
    },
    render: function () {
        var classList = ['reveal-wrapper'];
        if (this.state.on) classList.push('reveal-on');
        return (
            <Swiper className={classList.join(' ')} onSwipe={this.onSwipe}>
                <nav className="reveal-bar">
                    <DemoNav />
                </nav>
                <div className="reveal-pusher" onClick={this.exitMenu}>
                    <div className="reveal-content">
                        <div className="reveal-content-inner">
                            <Btn color="link" icon="navicon-round" onClick={this.onMenuToggle} />
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Swiper>
        );
    }
});

// Demo!
var Demo = React.createClass({
    render: function () {
        return (<Reveal>
                <TypographyDemo />
                <ButtonsDemo />
                <FormsDemo />
                <GridDemo />
        </Reveal>);
    }
});

React.render(<Demo />, document.getElementById('demo'));
