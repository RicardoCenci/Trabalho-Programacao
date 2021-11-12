import '@icons/style.css'
import React, { useState } from 'react';
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
import { useAppSelector } from '@hooks';
import { AnimatePresence, motion } from 'framer-motion';
// const ws = new Websocket



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
     {/* <Router>
       <GlobalContextProvider>
         <Switch>
            
            <PrivateRoute path="/" exact>
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
            </Route>
        </Switch>
      </GlobalContextProvider>
    </Router> */}
    <Playground/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



function Playground(){
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState<any>(null)
  const Page1 = ()=>{
    return <p>Page1</p>
  }
  const Page2 = ()=>{
    return <p>Page2</p>
    
  }
  return(<>
            <AnimatePresence>
                {page && <motion.div
                  initial={{y : '100%'}}
                  animate={{ y: 0}}
                  transition={{ ease: "easeInOut", duration: .2 }}
                  exit={{x:'100%'}}
                >
                  {page}
                </motion.div>}

            </AnimatePresence>
            <button onClick={()=>setPage(Page1)}>Page1</button>
            <button onClick={()=>setPage(Page2)}>Page2</button>
            <button onClick={()=>setPage(null)}>Exit</button>
  </>)
}