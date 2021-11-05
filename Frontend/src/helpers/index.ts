import moment from 'moment'
import 'moment-timezone';
import 'moment/locale/pt-br';
import { useRef } from 'react';

export function useDate(timestamp : number){
    if (timestamp.toString().length < 11) {
        timestamp = timestamp * 1000
    }
    const data = moment(timestamp)
    const now = moment()

    if(data.isSame(now, "day")){
        return data.format('HH:mm')
    }

    if(data.isSame(now.subtract(1, 'day'), "day")){
        return now.subtract(0, 'day').calendar().split(" ")[0]
    }
    
    const diffWeeks = Math.abs(moment.duration(data.diff(now, 'milliseconds')).weeks());

    if (diffWeeks > 0) {
        return data.format("DD/MMMM/YYYY")
    }else{
        return data.format("dddd")
    }
}

export function useSizeTranslator(size : number | undefined) : string{
    if (!size) {
        return '0 bytes'
    }
    const exp = Math.log(size) / Math.log(1024) | 0;
    const result = (size / Math.pow(1024, exp)).toFixed(2);
    return result + ' ' + (exp === 0 ? 'bytes': 'KMGTPEZY'[exp - 1] + 'B');
}

export function randomColor(baseColor : Array<number> = [156, 44, 44]){
    const offset = randomNumberBetween(0,360);
    const [red, green, blue] = shiftHue(baseColor,offset);
    const textColor = (red*0.299 + green*0.587 + blue*0.114) > 186 ? 'black' : 'white'

    return {
        background : `rgb(${red},${green},${blue})`,
        text : textColor
    }
}


// Changes the RGB/HEX temporarily to a HSL-Value, modifies that value 
// and changes it back to RGB/HEX.

function shiftHue(rgb : Array<number>, degree : number) {
    const hsl = rgbToHSL(rgb)
    var hue = hsl[0]
    hue += degree;
    
    if (hue> 360) {
        hue -= 360;
    }
    else if (hue < 0) {
        hue += 360;
    }
    hsl[0] = hue
    return hslToRGB(hsl);
}
export function randomNumberBetween(min : number, max : number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export function rgbToHSL(rgb : Array<number>):Array<number>{
    const red   =   rgb[0] / 255
    const green =   rgb[1] / 255
    const blue  =   rgb[2] / 255

    const 
    Cmax = Math.max(red,green,blue),
    Cmin = Math.min(red,green,blue),
    delta = Cmax - Cmin

    var hue, 
    saturation,
    lightness = (Cmax + Cmin) / 2;

    if(delta === 0){
        hue = 0
        saturation = 0
    }else{
        saturation = delta / (1 - Math.abs(lightness * 2 - 1))
    }
    
    if (Cmax === red) {
        hue = 60 * (((green - blue) / delta) % 6)
    }else if(Cmax === green){
        hue = 60 * (((blue - red) / delta) + 2)
    }else{
        hue = 60 * (((red - green) / delta) + 4)
    }

    saturation = +(saturation * 100).toFixed(1);
    lightness = +(lightness * 100).toFixed(1);
    return [ hue , saturation , lightness]
}

export function hslToRGB(hsl : Array<number>){
    const hue = hsl[0] / 360
    const saturation = hsl[1] / 100
    const lightness = hsl[2] / 100

    var red, green, blue;

    if(saturation === 0){
        red = green = blue = lightness;
    }else{
        const hue2rgb = function hue2rgb(p : number, q : number, t : number){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hue2rgb(p, q, hue + 1/3);
        green = hue2rgb(p, q, hue);
        blue = hue2rgb(p, q, hue - 1/3);
    }

    return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];

}


export function getCookie(cname : string){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}