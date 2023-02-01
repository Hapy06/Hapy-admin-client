import React from 'react' ;
import {IconType} from "../models/models";

function IconDemande(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
            <path d="M16.0268 3.88C11.6135 3.88 8.02678 7.46667 8.02678 11.88V15.7333C8.02678 16.5467 7.68012 17.7867 7.26678 18.48L5.73345 21.0267C4.78678 22.6 5.44012 24.3467 7.17345 24.9333C12.9201 26.8533 19.1201 26.8533 24.8668 24.9333C26.4801 24.4 27.1868 22.4933 26.3068 21.0267L24.7734 18.48C24.3734 17.7867 24.0268 16.5467 24.0268 15.7333V11.88C24.0268 7.48001 20.4268 3.88 16.0268 3.88Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
            <path d="M18.4929 4.26667C18.0796 4.14667 17.6529 4.05334 17.2129 4C15.9329 3.84 14.7062 3.93334 13.5596 4.26667C13.9462 3.28 14.9062 2.58667 16.0262 2.58667C17.1462 2.58667 18.1062 3.28 18.4929 4.26667Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.0264 25.4133C20.0264 27.6133 18.2264 29.4133 16.0264 29.4133C14.933 29.4133 13.9197 28.96 13.1997 28.24C12.4797 27.52 12.0264 26.5067 12.0264 25.4133" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10"/>
        </svg>
    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconDemande
