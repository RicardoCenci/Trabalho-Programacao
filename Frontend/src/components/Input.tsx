import style from '@styles/Input.module.css'
import formInput from '@styles/FormInput.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

export function Input({innerRef,buttonRef,onButtonClick, ...props} : any){
    return (
        <div className={style.container}>
            <div className={style.inputContainer} >
                <span className={`${style.emojiButton} icon-smile`}></span>
                {/* Uma div com contentEditable é usada no lugar do input pois a div possui ja a capacidade de adequar seu tamanho dependendo do conteudo */}
                {/* sem precisar de javascript pra fazer esse trabalho, */}
                <div className={style.input} ref={innerRef} {...props} contentEditable></div>
            </div>
            <div className={`${style.sendIcon} icon-arrow`} onClick={onButtonClick} ref={buttonRef}></div>
        </div>
    )
}

export function FormInput({innerRef, className , name,label, message,setMessage,messageDelay = 4000, ...props} : any){
    const inputRef = useRef<any>();
    const messageDelayTimer = useRef<any>();
    if (innerRef?.current) {
        innerRef.current = inputRef.current
    }

    const handleClickInvalid = useCallback((e , inputName)=>{
        if (typeof setMessage === 'function') {
            setMessage('')
            messageDelayTimer.current = clearTimeout(messageDelayTimer.current)

        }
        if (inputRef.current) {
            inputRef.current.focus()
        }
    },[messageDelayTimer,inputRef,setMessage])
    
    useEffect(()=>{
        messageDelayTimer.current = clearTimeout(messageDelayTimer.current)
        messageDelayTimer.current = setTimeout(()=>{
            setMessage('')
            messageDelayTimer.current = clearTimeout(messageDelayTimer.current)

        },messageDelay)
    },[message,messageDelay,setMessage])


    return(
        <div className={formInput.container}>


            <input ref={inputRef} {...props} name={name} style={{outlineColor: message?.color ? message.color : 'inherit'}}/>

            <label htmlFor={name} className={formInput.label} >{label ?? name}</label>
            <AnimatePresence>
                {message?.icon && <motion.div
                    key={'icon'}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ ease: "easeInOut", duration: .1}}
                    exit={{opacity: 0}}>

                    <span onClick={(e)=>handleClickInvalid(e,name)} className={`${formInput.icon} ${message.icon}`} style={{color: message?.color ? message.color : 'inherit'}}></span>

                </motion.div>}

                {message && <motion.div
                    key={'message'}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{ ease: "easeInOut", duration: .1}}
                    exit={{opacity: 0}}>

                    <p className={formInput.message} style={{color: message?.color ? message.color : 'inherit'}}>

                        {message?.text ?? message}
                        
                    </p>

                </motion.div>}
            </AnimatePresence>
        </div>

    )
}
export default Input