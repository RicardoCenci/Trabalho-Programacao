import { GlobalContext } from '@contexts/GlobalContext'
import style from '@styles/Menu.module.css'
import { SyntheticEvent, useCallback, useContext, useEffect } from 'react'
import ContextMenu from './ContextMenu'

export default function Menu(props : any){
    const {activeTab, setActiveTab , activePageComponent} = useContext(GlobalContext)
    const handleClick = useCallback((e : SyntheticEvent, tab : any)=>{

        activePageComponent.current = tab.component
        setActiveTab(tab.name)
    },[activePageComponent,setActiveTab])
    
    useEffect(()=>{
        const defaultTab = document.getElementsByClassName(style.active)[0] as HTMLElement
        defaultTab.click()
    },[])

    const handleContextMenu = useCallback((e)=>{alert(e)},[])
    return(
        <div className={style.container}>
            <h1>Whatsapp 2</h1>
            <div className={style.icons}>
                <span className={`${style.search} icon-magnify-glass ${style.icon}`}></span>
                <ContextMenu icon={'menu'} className={style.contextMenu} itens={[
                    {text : "teste1"},
                    {text : "teste2"},
                ]} defaultAction={handleContextMenu}/>

                {/* <span className={`${style.contextMenu} ${style.icon}`}></span> */}
            </div>
            <div className={style.tabs}>
                {props.tabs.map((tab : any)=>{
                    return <p key={`menu-item-${tab.name}`} className={`${style.tab} ${activeTab.toUpperCase() === tab.name.toUpperCase() ? style.active : ''}`} onClick={(e)=>handleClick(e,tab)}>{tab.name}</p>
                })}
            </div>
        </div>
        )
}
