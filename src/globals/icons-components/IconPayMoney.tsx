import React from 'react' ;
import {IconType} from "../models";

function IconPayMoney(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M10.667 15.2001C10.667 16.2268 11.467 17.0668 12.4403 17.0668H14.4403C15.2937 17.0668 15.987 16.3334 15.987 15.4401C15.987 14.4668 15.5603 14.1201 14.9337 13.8934L11.7337 12.7734C11.0937 12.5468 10.667 12.2001 10.667 11.2268C10.667 10.3334 11.3603 9.6001 12.2137 9.6001H14.2137C15.2003 9.61343 16.0003 10.4401 16.0003 11.4668" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.333 17.1333V18.12" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.333 8.54688V9.58688" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3203 23.9732C19.204 23.9732 23.9737 19.2035 23.9737 13.3198C23.9737 7.43616 19.204 2.6665 13.3203 2.6665C7.43665 2.6665 2.66699 7.43616 2.66699 13.3198C2.66699 19.2035 7.43665 23.9732 13.3203 23.9732Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.3066 26.5068C18.5066 28.2002 20.4666 29.3068 22.7066 29.3068C26.3466 29.3068 29.3066 26.3468 29.3066 22.7068C29.3066 20.4935 28.2133 18.5335 26.5466 17.3335" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconPayMoney
