import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes'
import './App.css';
import Sidebar from './components/sidebar'

import { ApolloProvider } from '@apollo/react-hooks';
import client from './config/graphQL'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router className="App">
        <div className='home'>
          <div className='sidebar'>
            <div style={{ padding: '20px' }}>
              <h3 style={{ color: '#fff' }}>Sidebar</h3>
              <Sidebar />
            </div>
          </div>
          <div className='main-content'>
            <Switch>
              {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export default App;
