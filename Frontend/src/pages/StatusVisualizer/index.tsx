import { useCallback, useEffect, useState } from 'react'
import style from './StatusVisualizer.module.css'
import placeholderImage from '@images/default.png'
import Moment from 'react-moment'
import { recievedPage } from '@features/global/globalSlice'
import { getApi } from '@features/api/apiSlice';
import { useAppDispatch, useAppSelector } from '@hooks';
import { isEmpty } from '@helpers'
import { Status } from '@types'


export default function StatusVisualizer({ status }: { status: any }) {
    const dispatch = useAppDispatch()
    const [statusList, setStatusList] = useState<Array<Status>>([])
    const [head, setHead] = useState(0)

    const api = useAppSelector(getApi)

    const closeChat = useCallback(() => {
        dispatch(recievedPage(null))

    }, [dispatch])

    useEffect(() => {
        if (isEmpty(status)) {
            return
        }
        async function getData() {

            const response = await api.get(`/status/${status.user.id}`)
            setStatusList(response.body);

        }

        getData();
    }, [status])

    const StatusCounter = () => {
        const StatusPiece = ({ percentage = 0 }: { percentage: number }) => {
            return (
                <span className={`${style.statusCountCell} ${percentage === 100 ? style.viewd : ''}`}>
                    <span className={style.statusPiece} style={{ width: `${percentage}%` }}></span>
                </span>
            )
        }
        return (
            <div className={style.statusCount}>
                {new Array(status.status_count).fill(false).fill(true, 0, head + 1).map((visualized)=><StatusPiece percentage={visualized ? 100 : 0} />)}
            </div>
        )
    }
    function swipe(direction : number) {
        if (head + direction < 0 || head + direction > status.status_count - 1) {
            return
        }
        setHead(head + direction)
    }
    return (
        <div className={style.container}>

            {statusList[head] && <>
                <div className={style.swiper}>
                    <div className={style.left} onClick={()=>swipe(-1)}></div>
                    <div className={style.right} onClick={()=>swipe(1)}></div>
                </div>
                <div className={style.header}>
                    <StatusCounter />
                    <div className={style.headerInfoContainer}>
                        <span className={`icon-arrow ${style.backIcon}`} onClick={closeChat}></span>
                        <div className={style.userPhoto}><img src={placeholderImage} alt="" /></div>
                        <div className={style.headerInfo}>
                            <span className={style.userName}>{status.user.first_name} {status.user.last_name}</span>
                            <Moment className={style.statusTimestamp} fromNow unix>{statusList[head].timestamp}</Moment>
                        </div>
                    </div>
                </div>
                <main className={style.statusContent}>
                    <img src={statusList[head].content.url} alt="" className={style.statusContent} />
                </main>
                <div className={style.footer}>
                    <span className={style.statusText}>{statusList[head].description}</span>
                    <span className='icon-arrow'></span>
                    <span className={style.replyText}>Responder</span>
                </div>
                
            </>}
        </div>
    )
}