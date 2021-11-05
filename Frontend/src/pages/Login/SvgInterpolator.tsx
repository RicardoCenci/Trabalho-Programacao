import React from "react"

import { useEffect, useRef, useState } from "react"

function Svg({url} : {url:string}){
    const [SVG, setSVG] = useState<any>({})

    useEffect(()=>{
        const object = document.createElement('OBJECT') as HTMLObjectElement
        document.body.append(object);
        object.onload = function(e){
            const element = e.currentTarget as HTMLObjectElement
            const svg = element.contentDocument?.getElementsByTagName('svg')[0].cloneNode(true)
            document.body.removeChild(object)
            setSVG(parseSVG(svg))
        }
        object.setAttribute('data',url)       
    },[url])
    
    const parseSVG = (svg : any)=>{
        const parseAttr = (el : any)=>{
            return el.getAttributeNames().reduce((a :any, v :any) => ({ ...a, [v]: el.getAttribute(v) }), {})
        }
         const parsedChildren = Array.from(svg.children).map((el:any)=>{
            const attrs = parseAttr(el)
            return {
                "type" : el.tagName,
                "attributes" : parseAttr(el)
            }
        })
        return {
            'attributes': svg.getAttributeNames().reduce((a :any, v :any) => ({ ...a, [v]: svg.getAttribute(v) }), {}),
            'children' : parsedChildren
        }
    }
    return(
        <svg {...SVG['attributes']}>
            {SVG['children']?.map((el:any, index: any)=>{
                el.attributes['key'] = index
                return React.createElement(el.type, el.attributes)
            })}
        </svg>
    )
}

export default Svg