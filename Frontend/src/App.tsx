import style from '@styles/App.module.css'
import { GlobalContext } from "@contexts/GlobalContext"
import { useContext } from 'react';
import React from 'react';
import { AnimatePresence, motion } from "framer-motion"
import { useAppSelector } from '@hooks';

export default function App() {
  const { activePageComponent, activeTab} = useContext(GlobalContext)
  const page = useAppSelector(state => state.global.popupPage);


  if (typeof activePageComponent?.current !== 'function') {
    return (<div>Loading...</div>)
  }
  
  const transitions: { [key: string]: any } = {
    Status: {
      initial: { x: '100%' },
      exit: { x: '400%', position: 'absolute' }

    },
    Contatos: {
      initial: { x: '-100%' },
      exit: { x: '-100%', position: 'absolute' }
    },
  }
  return (<>
    <main className={style.container}>
    {!page && <AnimatePresence>
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
      {page && <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: .2 }}
        exit={{ x: '100%' }}
        className='popup-page-container'
      >
        {page}
      </motion.div>}

    </AnimatePresence>
  </>);
}