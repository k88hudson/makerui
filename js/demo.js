var React = require('react');
var Router = require('react-router');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

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
        if (this.props.noPad) classList.push('no-pad');
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

var countries = [
    {name: 'Canada'},
    {name: 'United States'},
    {name: 'Germany'},
    {name: 'United Kingdom'}
];

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

var FormsDemo = React.createClass({
    render: function () {
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
        var self = this;
        return (<ul className="nav">
            <li><span className="nav-title">Sections</span></li>
            {routes.map(function (route) {
                return <li><Link to={route.name} onClick={self.props.close}>{route.label}</Link></li>
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
        this.setState({
            on: !this.state.on
        });
    },
    render: function () {
        var classList = ['reveal-wrapper'];
        var btnClass = 'blue menu-btn';
        if (this.state.on) {
            classList.push('reveal-on');
            btnClass += ' active';
        }

        return (
            <Swiper className={classList.join(' ')} onSwipe={this.onSwipe}>
                <nav className="reveal-bar">
                    <DemoNav close={this.onMenuToggle} />
                </nav>
                <div className="reveal-pusher" onClick={this.exitMenu}>
                    <div className="reveal-content">
                        <div className="reveal-content-inner">
                            <Btn color={btnClass} icon="navicon-round" onClick={this.onMenuToggle} />
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Swiper>
        );
    }
});

var Donate = React.createClass({
    getInitialState: function () {
        return {
            slide: 0,
            showAddress: false
        };
    },
    next: function (next) {
        var self = this;
        var total = 3;
        if (next === self.state.slide) return;
        if (typeof next !== 'number') next = self.state.slide + 1;
        if (next >= total) next = 0;
        return function (e) {
            e.preventDefault();
            self.setState({slide: next});
        };
    },
    getLeftPos: function() {
        return -(this.state.slide * 100) + '%';
    },
    onCountryChange: function () {
        this.setState({showAddress: true});
    },
    render: function () {
        var self = this;
        var sections = [
            'Amount',
            'Payment',
            'Personal'
        ].map(function (section, i) {
            return <li>
                <a href="#amount"
                    className={self.state.slide === i ? 'active' : ''}
                    onClick={self.next(i)}>{section}</a>
            </li>
        });

        var addressClass = 'grid';
        if (this.state.slide !== 2 || !this.state.showAddress) addressClass +=' hidden';

        return (<div className="donate-wrapper"><div className="donate-form">
                <nav>
                    <ol className="nav">
                        {sections}
                    </ol>
                </nav>
                <div className="slider" style={{marginLeft: this.getLeftPos()}}>
                    <div className="slide">
                        <form className="form">
                            <h3>Donate now</h3>
                            <Grid>
                                <Column base="12/24" sm="8/24"><Btn block color="white">$20</Btn></Column>
                                <Column base="12/24" sm="8/24"><Btn block color="white">$10</Btn></Column>
                                <Column base="12/24" sm="8/24"><Btn block color="white">$5</Btn></Column>
                                <Column base="12/24" sm="8/24"><Btn block color="white">$3</Btn></Column>
                                <Column sm="16/24"><input /></Column>
                                <Column>
                                    <Checkbox noPad name="monthly">Donate monthly</Checkbox>
                                </Column>
                                <Column>
                                    <Btn onClick={this.next()}>Next</Btn>
                                </Column>
                            </Grid>
                        </form>
                    </div>
                    <div className="slide">
                        <form className="form">
                            <h3>Payment</h3>
                            <Grid>
                                <Column sm="12/24"><Btn block color="white payment">
                                    <img src="/images/visamastercard.png" />
                                    Credit Card
                                </Btn></Column>
                                <Column sm="12/24"><Btn block color="white payment">
                                        <img src="/images/paypal.png" />
                                        Paypal
                                </Btn></Column>
                                <Column><Btn onClick={this.next()}>Next</Btn></Column>
                            </Grid>
                        </form>
                    </div>
                    <div className="slide">
                        <form className="form">
                            <h3>Personal</h3>
                            <Grid>
                                <Column landscape="12/24">
                                    <input name="first" placeholder="First Name *" />
                                </Column>
                                <Column landscape="12/24">
                                    <input name="last" placeholder="Last Name *" />
                                </Column>
                                <Column>
                                    <select name="country" onChange={this.onCountryChange}>
                                        <option selected>Country *</option>
                                        {countries.map(function (data) {
                                            return <option>{data.name}</option>;
                                        })}
                                    </select>
                                </Column>
                            </Grid>
                            <div className={addressClass}>
                                <Column>
                                    <input name="ship-address" placeholder="Address *" />
                                </Column>
                                <Column landscape="12/24">
                                    <input name="city" placeholder="City *" />
                                </Column>
                                <Column landscape="12/24">
                                    <input name="postal-code" placeholder="Postal Code *" />
                                </Column>
                                <Column>
                                    <select name="province">
                                        <option selected>Province or Territory *</option>
                                        {provinces.map(function (data) {
                                            return <option>{data.name}</option>;
                                        })}
                                    </select>
                                </Column>
                                <Column>
                                    <Checkbox>I’m okay with you handling this info as you explain in your privacy policy.</Checkbox>
                                </Column>
                                <Column><Btn onClick={this.next()}>Next</Btn></Column>
                            </div>
                        </form>
                    </div>
                </div>
        </div></div>);
    }
});

// CSS
var CSS = React.createClass({
    render: function () {
        return (<div>
            <TypographyDemo />
            <ButtonsDemo />
            <FormsDemo />
            <GridDemo />
        </div>);
    }
});

var Base = React.createClass({
    mixins: [ Router.State ],
    render: function () {
        var name = this.getRoutes().reverse()[0].name;
        return (
            <Reveal>
                <TransitionGroup component="div" className="route-inner" transitionName="fadeIn">
                    <RouteHandler key={name} />
                </TransitionGroup>
            </Reveal>
        );
    }
});

var Splash = React.createClass({
    render: function () {
        return (
            <div>
                <section className="hero">
                    <Grid className="container">
                        <Column>
                            <h1>Dogs are great,<br /> don&rsquo;t you <em>totally</em> agree?</h1>
                            <p className="subheading">I love dogs because they are super cute, cuddly,<br /> and they are really good company.</p>
                            <Btn color="pink hero-btn" icon="heart">I agree</Btn>
                            <Btn color="white hero-btn" icon="info">Learn more</Btn>
                        </Column>
                    </Grid>
                </section>
                <section className="main container">
                    <Grid>
                        <Column sm="8/24">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Column>
                        <Column sm="8/24">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Column>
                        <Column sm="8/24">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Column>
                    </Grid>
                </section>
            </div>
        );
    }
});

var routes = [
    { name: 'css', path: '/css/', handler: CSS, label: 'CSS' },
    { name: 'donate', path: '/donate/', handler: Donate, label: 'Donate' },
    { name: 'splash', path: '/splash/', handler: Splash, label: 'Splash' }
];

var routeEls = (
    <Route handler={Base}>
        {routes.map(function (route) {
            return <Route name={route.name} path={route.path} handler={route.handler} addHandlerKey={true} />
        })}
    </Route>
);

Router.run(routeEls, Router.HistoryLocation, function (Handler) {
   React.render(<Handler />, document.getElementById('demo'));
});

