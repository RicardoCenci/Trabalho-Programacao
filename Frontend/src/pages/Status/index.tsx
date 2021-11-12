import style from './Status.module.css'
import Status from '@components/Status'
import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { isEmpty } from '@helpers';
import { useAppDispatch } from '@store';
import { useAppSelector } from '@hooks';

import { recievedPage } from '@features/global/globalSlice';
import StatusVisualizerPage from '@pages/StatusVisualizer'
function Page(){
    const [currentStatus, setCurrentStatus] = useState({});
    const dispatch = useAppDispatch();
    const page = useAppSelector(state => state.global.popupPage);

    const handleClick = useCallback(()=>{
        setCurrentStatus({test:'test'})
        dispatch(recievedPage(<StatusVisualizer/>))
    },[])

    const StatusVisualizer = useCallback(()=>{
        return (<>
            {currentStatus && <motion.div
              initial={{y : '100%'}}
              animate={{ y: 0}}
              transition={{ ease: "easeInOut", duration: .2 }}
              exit={{x:'100%'}}
              className={style.statusContainer}
            >
                <StatusVisualizerPage status={currentStatus}/>
            </motion.div>}
          </>)

      },[currentStatus])
    return(
        !page && (
        <div className={style.container}>
            <Status onClick={handleClick} />
            <Status onClick={handleClick}/>
            <Status onClick={handleClick}/>
            <Status onClick={handleClick}/>
            <Status onClick={handleClick}/>
            <Status onClick={handleClick}/>
            <Status onClick={handleClick}/>
        </div>)
    )
}



export default Page
