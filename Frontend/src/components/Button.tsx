
import style from '@styles/Buttons.module.css'

function Default(props : any){
    return(
        <button className={`${style.base} ${style[props.type]} ${style[props.variation]}`} {...props}>{props.text}</button>
    )
}

const PositiveAction = {
    Default     : (props : any)=> <Default {...props} variation='default'  type="positive"/>,
    Round       : (props : any)=> <Default {...props} variation='round'  type="positive"/>,
    Outlined    : (props : any)=> <Default {...props} variation='outlined' type="positive"/>,
    Barebone    : (props : any)=> <Default {...props} variation='barebone' type="positive"/>,
}

const NegativeAction = {
    Default     : (props : any)=> <Default {...props} variation='default' type="negative"/>,
    Round       : (props : any)=> <Default {...props} variation='round' type="negative"/>,
    Outlined    : (props : any)=> <Default {...props} variation='outlined' type="negative"/>,
    Barebone    : (props : any)=> <Default {...props} variation='barebone' type="negative"/>,
}


const Button = {
    PositiveAction : PositiveAction,
    NegativeAction : NegativeAction
}
export default Button