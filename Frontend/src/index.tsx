import '@icons/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'


import Menu from "@components/Menu"
import { GlobalContextProvider } from '@contexts/GlobalContext'
import '@styles/Main.module.css'
import '@styles/Normalize.module.css'
import ContactsPage from '@pages/Contacts'
import StatusPage from '@pages/Status'
import App from './App'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import Websocket from '@helpers/Websocket'
import PrivateRoute from '@helpers/PrivateRoute';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Recovery from '@pages/Recovery';

import store from '@store'
import Loading from '@components/Loading';
// const ws = new Websocket



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     <Router>
       <GlobalContextProvider>
         <Switch>
             {/* <PrivateRoute path="/" exact>
               <Menu tabs={[
                { name: 'Contatos',
                  component : ContactsPage},
                { name: 'Status',
                  component : StatusPage}
              ]}/>
              <App/>
            </PrivateRoute>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/recovery">
              <Recovery />
            </Route> */}
          <Loading/>
        </Switch>
      </GlobalContextProvider>
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

