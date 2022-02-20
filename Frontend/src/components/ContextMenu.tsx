import { MouseEventHandler, SyntheticEvent, useCallback, useLayoutEffect, useRef, useState } from "react"
import style from '@styles/ContextMenu.module.css'
import React from "react"
import { useEvent } from "@helpers"
interface Item{
    text: String
    action? : Function
}
const Container = React.forwardRef<HTMLDivElement, any>(({ itens , defaultAction,closeMenu,handleWrapperClick, ...props} : {itens : Array<Item> ,handleWrapperClick : MouseEventHandler,closeMenu : Function, defaultAction: Function, [key:string]:any}, ref) => {
    const handleClick = useCallback((event: SyntheticEvent, item : Item)=>{
        if (closeMenu) {
            closeMenu.call(event,event,item)
        }
        if (item.action) {
            item.action.call(event, event, item)
            return
        }
        if (defaultAction) {
            defaultAction.call(event, event, item)
            return
        }
    },[defaultAction,closeMenu])

    return(
        <div className={style.wrapper} onClick={handleWrapperClick}>
            <div className={style.container} ref={ref} {...props}>
                {
                    itens.map((item,index)=>{
                        return <p onClick={(e)=>handleClick(e,item)} className={style.item} key={`action-menu-${item.text}-${index}`}>{item.text}</p>
                    })
                }
            </div>
        </div>
    )
})


const ContextMenu = ({icon = 'menu', className = '', itens, defaultAction, ...props} : {icon: string, className : string, itens: Array<Item>, defaultAction:Function} ) => {  
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLSpanElement>(null)

    const handleClick = useCallback(()=>{
        setIsOpen(!isOpen)
    },[isOpen,setIsOpen])

    useLayoutEffect(()=>{
        if (!isOpen || !buttonRef.current || !containerRef.current) {
            return
        }
        const buttonPosition = buttonRef.current.getBoundingClientRect()
        
        containerRef.current.style.left = buttonPosition.x + buttonPosition.width / 2.5 + "px"
        containerRef.current.style.top = buttonPosition.y + buttonPosition.height + "px"

        const containerPosition = containerRef.current.getBoundingClientRect()
        console.log(containerPosition.right >= (document.body.getBoundingClientRect().width))
        if(containerPosition.right >= (document.body.getBoundingClientRect().width)){
            // Se a borda da direita estiver intersectando com a window, quer dizer q o nosso menu deve ser virado pro lado contrario
            // Isso ira garantir que o menu esta sempre na tela
            
            containerRef.current.style.left = buttonPosition.x + buttonPosition.width / 1.7 - containerPosition.width + "px"
        }

    },[isOpen, buttonRef, containerRef])
    const handleWrapperClick = useCallback(()=>{
        if (isOpen) {
            setIsOpen(false)
        }
    },[isOpen])
    return(<>
        <span ref={buttonRef} {...props} onClick={handleClick} className={`icon-${icon || 'menu'} ${className ?? ""}`}></span>
        {isOpen && <Container ref={containerRef} handleWrapperClick={handleWrapperClick} itens={itens} defaultAction={defaultAction} closeMenu={handleClick}/>}
    </>);
}

export default ContextMenu