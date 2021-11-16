import { StatusT } from "@types"
import style from '@styles/Status.module.css'
import photo from '@images/tree-736885__480.jpg'
import userp from '@images/default.png'

function Status({status, ...props} : {status?: StatusT, [key:string]:any}){
    const status1 = {last_status:{
        url: photo
    }} 
    const user = {
        photo: userp,
        first_name: 'Ricardo',
        last_name:'Cenci Fabris',

    }
    return(<>
        <div className={style.container} {...props} style={{backgroundImage: `url(${status1.last_status.url})`}}>
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