import React from 'react' ;
import {IconType} from "../models/models";

function IconTrash(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + (props.width || 32) + ' ' + (props.height || 32)}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M28 7.97331C23.56 7.53331 19.0933 7.30664 14.64 7.30664C12 7.30664 9.36 7.43997 6.72 7.70664L4 7.97331" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.333 6.62602L11.6263 4.87935C11.8397 3.61268 11.9997 2.66602 14.253 2.66602H17.7463C19.9997 2.66602 20.173 3.66602 20.373 4.89268L20.6663 6.62602" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25.1339 12.1875L24.2672 25.6142C24.1205 27.7075 24.0005 29.3342 20.2805 29.3342H11.7205C8.00052 29.3342 7.88052 27.7075 7.73385 25.6142L6.86719 12.1875" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.7734 22H18.2134" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.667 16.666H19.3337" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconTrash
