import { StatusT } from "@types"
import style from '@styles/Status.module.css'

function Status(props : any){
    const status: StatusT = props.status
    const user = {
        photo: 'a',
        first_name: 'b',
        last_name:'c'
    }
    return(
        <div className={style.container} style={{backgroundImage: `url(${status.last_status.url})`}}>
            <div className={style.userPhoto}>
                <img src={user.photo} alt={`${user.first_name} ${user.last_name}`}/>
            </div>
            <p className={style.name}>{user.first_name} {user.last_name}</p>
        </div>
    )
}

export default Status