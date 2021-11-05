import logo from '@images/Logo.svg'
import style from '@styles/Loading.module.css'
import LoadingBar from '@components/LoadingBar'
export default function LoadingScreen(){
    return (
        
        <div className={style.container}>
            <img src={logo} alt=""/>
            <LoadingBar/>
        </div>
    )

}