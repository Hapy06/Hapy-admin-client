import React from 'react' ;
import {IconType} from "../models";

function IconDoubleHeart(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M19.86 8.0896C19.86 8.5096 19.83 8.9196 19.78 9.3096C19.32 9.1096 18.82 8.9996 18.29 8.9996C17.07 8.9996 15.99 9.58959 15.32 10.4896C14.64 9.58959 13.56 8.9996 12.34 8.9996C10.29 8.9996 8.63 10.6696 8.63 12.7396C8.63 15.4196 10.05 17.4696 11.63 18.8596C11.58 18.8896 11.53 18.8996 11.48 18.9196C11.18 19.0296 10.68 19.0296 10.38 18.9196C7.79 18.0296 2 14.3496 2 8.0896C2 5.3296 4.21999 3.09961 6.95999 3.09961C8.58999 3.09961 10.03 3.8796 10.93 5.0896C11.84 3.8796 13.28 3.09961 14.9 3.09961C17.64 3.09961 19.86 5.3296 19.86 8.0896Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.9999 12.7395C21.9999 17.4195 17.6699 20.1795 15.7299 20.8395C15.4999 20.9195 15.1299 20.9195 14.8999 20.8395C14.0699 20.5595 12.7999 19.8895 11.6299 18.8595C10.0499 17.4695 8.62988 15.4195 8.62988 12.7395C8.62988 10.6695 10.2899 8.99951 12.3399 8.99951C13.5599 8.99951 14.6399 9.5895 15.3199 10.4895C15.9899 9.5895 17.0699 8.99951 18.2899 8.99951C18.8199 8.99951 19.3199 9.10951 19.7799 9.30951C21.0899 9.88951 21.9999 11.1995 21.9999 12.7395Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconDoubleHeart
