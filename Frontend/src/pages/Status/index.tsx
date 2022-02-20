import style from './Status.module.css'
import Status from '@components/Status'
import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useAppDispatch } from '@store';
import { useAppSelector } from '@hooks';

import { recievedPage } from '@features/global/globalSlice';
import StatusVisualizerPage from '@pages/StatusVisualizer'
import { getApi } from '@features/api/apiSlice';
import { recievedStatusList } from '@features/status/statusListSlice';
import { entries } from '@helpers';
function Page(){
    const [currentStatus, setCurrentStatus] = useState({});
    const dispatch = useAppDispatch();
    const page = useAppSelector(state => state.global.popupPage);

    const statusList = useAppSelector(state => state.statusList.items)


    const api = useAppSelector(getApi)

    const StatusVisualizer = useCallback(({status})=>{
        return (<>
            {currentStatus && <motion.div
              initial={{y : '100%'}}
              animate={{ y: 0}}
              transition={{ ease: "easeInOut", duration: .2 }}
              exit={{x:'100%'}}
              className={style.statusContainer}
            >
                <StatusVisualizerPage status={status}/>
            </motion.div>}
          </>)

      },[currentStatus])


    useEffect(()=>{
        async function getData(){
            const response = await api.get('/status')
            dispatch(recievedStatusList(response.body))
        }

        getData();

    },[])
    const handleClick = useCallback((status)=>{
        setCurrentStatus(status)
        dispatch(recievedPage(<StatusVisualizer status={status}/>))


    },[StatusVisualizer, dispatch])

    return(
        !page && (
        <div className={style.container}>
            {entries(statusList).map(([index, status]) => <Status onClick={handleClick} status={status}/>)}
        </div>)
    )
}



export default Page
