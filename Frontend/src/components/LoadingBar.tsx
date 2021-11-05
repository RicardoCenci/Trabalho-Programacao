import style from '@styles/LoadingBar.module.css'

export default function LoadingBar({percentage = 0}){
    return(
        <div className={style.progressBarContainer}>
            <div className={style.progressBar} style={{width: percentage+"%"}}></div>
        </div>
    )
}