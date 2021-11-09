import style from './Status.module.css'
import Status from '@components/Status'
import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { isEmpty } from '@helpers';

function Page(){
    const [currentStatus, setCurrentStatus] = useState({});

    const handleClick = useCallback(()=>{
        setCurrentStatus({test:'test'})
    },[])
    return(
        isEmpty(currentStatus) && (<div className={style.container}>
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

function StatusVisualizer({status} : {status:any}){
    return (
        <div className={style.visualizer}>
            teste3
        </div>
    )
}

export default Page