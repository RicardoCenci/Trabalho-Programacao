import style from '@styles/App.module.css'
import { GlobalContext } from "@contexts/GlobalContext"
import { useContext} from 'react';
import React from 'react';
import { AnimatePresence, motion } from "framer-motion"
import Chat from '@pages/Chat'
import { useAppSelector } from '@hooks';
import { getApi } from '@features/api/apiSlice';

export default function App() {
  const {activePageComponent ,activeTab,currentContact , openChat} = useContext(GlobalContext)
  if (typeof activePageComponent?.current !== 'function') {
    return (<div>Loading...</div>)
  }
  const transitions : { [key : string] : any }= {
    Status : {
      initial:  { x: '100%' },
      exit:     { x: '400%', position:'absolute'}

    },
    Contatos : {
      initial:  { x: '-100%'},
      exit:     { x: '-100%', position:'absolute'}
    },
  }
  return (<>
    <main className={style.container}>
          {!openChat && <AnimatePresence>
              <motion.div
                  key={activeTab}
                  initial={transitions[activeTab].initial}
                  animate={{ x: 0 }}
                  transition={{ ease: "easeInOut", duration: .1 }}
                  exit={transitions[activeTab].exit}
                >
                {React.createElement(activePageComponent.current)}
                </motion.div>
        </AnimatePresence>}
    </main>
    <AnimatePresence>
      {currentContact && openChat && <motion.div
          initial={{y : '100%'}}
          animate={{ y: 0}}
          transition={{ ease: "easeInOut", duration: .2 }}
          exit={{x:'100%'}}
          className={style.chatContainer}
        >
          <Chat currentContact={currentContact}/>
        </motion.div>}
    </AnimatePresence>
  </>);
}
