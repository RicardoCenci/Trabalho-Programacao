import { ContactStatus } from "@types"
import style from '@styles/Status.module.css'
import photo from '@images/tree-736885__480.jpg'
import userp from '@images/default.png'
import { useCallback } from "react"

function Status({status, onClick, ...props} : {status: ContactStatus, [key:string]:any}){
    const user = status.user
    const click = useCallback(() =>{
        if (typeof onClick === 'function') {
            onClick(status)
        }
    },[status, onClick])
    return(<>
        <div className={style.container} {...props} onClick={click} style={{backgroundImage: `url(${status.last_status.content.url})`}}>
            <div className={style.userPhoto}>
                <div className={style.userPhotoRouded}>
                    <img src={user.photo} alt={`${user.first_name} ${user.last_name}`}/>
                </div>
            </div>
            <p className={style.name}>{user.first_name} {user.last_name}</p>
        </div>
    </>
    )
}


export default Status