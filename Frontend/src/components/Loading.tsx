import logo from '@images/Logo Standard.svg'
import style from '@styles/Loading.module.css'
import LoadingBar from '@components/LoadingBar'
import { useAppSelector } from '@hooks';


export default function LoadingScreen(){
    const loading = useAppSelector(state => state.global.loading)

    return ( 
        <div className={style.container}>
            <img src={logo}/>
            <LoadingBar percentage={loading}/>
        </div>
    )

}