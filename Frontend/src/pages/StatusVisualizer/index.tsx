import { useCallback } from 'react'
import style from './StatusVisualizer.module.css'
import placeholderImage from '@images/default.png'
import Moment from 'react-moment'
import { useAppDispatch } from '@store'
import { recievedPage } from '@features/global/globalSlice'


export default function StatusVisualizer({status} : {status:any}){
    const dispatch = useAppDispatch()
    const closeChat = useCallback(()=>{
        dispatch(recievedPage(null))

    },[])
    const StatusCounter = ()=>{
        const StatusPiece = ({percentage = 0} : {percentage : number}) => {
            return (
                <span className={`${style.statusCountCell} ${percentage === 100 ? style.viewd : ''}`}>
                    <span className={style.statusPiece} style={{width : `${percentage}%`}}></span>
                </span>
            )
        }
        return (
            <div className={style.statusCount}>
                <StatusPiece percentage={100}/>
                <StatusPiece percentage={50}/>
                <StatusPiece percentage={0}/>
                <StatusPiece percentage={0}/>
            </div>
        )
    }
    return (
        <div className={style.container}>
            <div className={style.header}>
                <StatusCounter/>
                <div className={style.headerInfoContainer}>
                    <span className={`icon-arrow ${style.backIcon}`} onClick={closeChat}></span>
                    <div className={style.userPhoto}><img src={placeholderImage} alt="" /></div>
                    <div className={style.headerInfo}>
                        <span className={style.userName}>Placeholder name</span>
                        <Moment className={style.statusTimestamp} fromNow date={ new Date()} />
                    </div>
                </div>
            </div>
            <main className={style.statusContent}>
                <img src={placeholderImage} alt="" className={style.statusContent}/>
            </main>
            <div className={style.footer}>
                <span className={style.statusText}>Teste Teste</span>
                <span className='icon-arrow'></span>
                <span className={style.replyText}>Responder</span>
            </div>
        </div>
    )
}