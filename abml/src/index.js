import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './views/List';
import Create from './views/Create';
import Update from './views/Update';
import * as serviceWorker from './serviceWorker';

import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';

const routing = (
  <Router>
    <div>
    	<nav>
          	<div className="nav-wrapper">
            	<a className="brand-logo">Contactos</a>
            	<ul id="nav-mobile" className="right hide-on-med-and-down">
              		<li><Link to="/Create">Crear Contacto</Link></li>
              		<li><Link to="/">Lista de Contactos</Link></li>
            	</ul>
          	</div>
        </nav>
      	<Switch>
        	<Route exact path="/" component={List} />
        	<Route path="/create" component={Create} />
        	<Route path="/update/:id" component={Update} />
      	</Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
