import React from 'react' ;
import {IconType} from "../models";

function IconGoldenBook(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M29.818 22.8043V6.71097C29.818 5.11097 28.5114 3.9243 26.9247 4.05763H26.8447C24.0447 4.29763 19.7914 5.7243 17.418 7.21763L17.1914 7.3643C16.8047 7.6043 16.1647 7.6043 15.778 7.3643L15.4447 7.1643C13.0714 5.6843 8.83137 4.27097 6.03137 4.0443C4.4447 3.91097 3.15137 5.11097 3.15137 6.69763V22.8043C3.15137 24.0843 4.19137 25.2843 5.47137 25.4443L5.85803 25.4976C8.75137 25.8843 13.218 27.351 15.778 28.751L15.8314 28.7776C16.1914 28.9776 16.7647 28.9776 17.1114 28.7776C19.6714 27.3643 24.1514 25.8843 27.058 25.4976L27.498 25.4443C28.778 25.2843 29.818 24.0843 29.818 22.8043Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.4844 7.8042V27.8042" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.8174 11.8042H7.81738" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.8174 15.8042H7.81738" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconGoldenBook
