import React from 'react' ;
import {IconType} from "../models";

function IconSeparation(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width | 32} height={props.height | 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M26.6667 9.38675V22.6134C26.6667 24.6401 26.48 26.0801 26 27.1068C26 27.1201 25.9866 27.1468 25.9733 27.1601C25.68 27.5334 25.2933 27.7201 24.84 27.7201C24.1333 27.7201 23.28 27.2534 22.36 26.2667C21.2667 25.0934 19.5866 25.1867 18.6266 26.4667L17.28 28.2534C16.7467 28.9734 16.04 29.3334 15.3333 29.3334C14.6267 29.3334 13.92 28.9734 13.3866 28.2534L12.0267 26.4534C11.08 25.1867 9.41332 25.0934 8.31999 26.2534L8.30664 26.2667C6.79997 27.8801 5.46669 28.1201 4.69336 27.1601C4.68003 27.1468 4.66667 27.1201 4.66667 27.1068C4.18667 26.0801 4 24.6401 4 22.6134V9.38675C4 7.36008 4.18667 5.92008 4.66667 4.89341C4.66667 4.88008 4.66669 4.86675 4.69336 4.85341C5.45336 3.88008 6.79997 4.12008 8.30664 5.73341L8.31999 5.74675C9.41332 6.90675 11.08 6.81341 12.0267 5.54675L13.3866 3.74675C13.92 3.02675 14.6267 2.66675 15.3333 2.66675C16.04 2.66675 16.7467 3.02675 17.28 3.74675L18.6266 5.53342C19.5866 6.81342 21.2667 6.90675 22.36 5.73341C23.28 4.74675 24.1333 4.28008 24.84 4.28008C25.2933 4.28008 25.68 4.48008 25.9733 4.85341C26 4.86675 26 4.88008 26 4.89341C26.48 5.92008 26.6667 7.36008 26.6667 9.38675Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.667 13.6667H21.3337" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.667 18.3333H18.667" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

    )
    /*
    <path fill={props.fill || "none"} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconSeparation
