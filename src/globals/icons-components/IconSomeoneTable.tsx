import React from 'react' ;
import {IconType} from "../models";

function IconSomeoneTable(props: IconType) {
    return (
        <svg onClick={props.handleClick} width={props.width || 32} height={props.height || 32} viewBox={'0 0 ' + props.width + ' ' + props.height}
             fill={props.fill || "none"} xmlns="http://www.w3.org/2000/svg" style={props.styleIcon} className={props.classIcon}>
                <path d="M23.9995 9.54602C23.9195 9.53269 23.8261 9.53269 23.7461 9.54602C21.9061 9.47935 20.4395 7.97268 20.4395 6.10602C20.4395 4.19935 21.9728 2.66602 23.8795 2.66602C25.7861 2.66602 27.3194 4.21268 27.3194 6.10602C27.3061 7.97268 25.8395 9.47935 23.9995 9.54602Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22.6259 19.2527C24.4526 19.5593 26.4659 19.2393 27.8793 18.2927C29.7593 17.0393 29.7593 14.986 27.8793 13.7327C26.4526 12.786 24.4126 12.466 22.5859 12.786" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.95965 9.54602C8.03965 9.53269 8.13298 9.53269 8.21298 9.54602C10.053 9.47935 11.5196 7.97268 11.5196 6.10602C11.5196 4.19935 9.98632 2.66602 8.07965 2.66602C6.17298 2.66602 4.63965 4.21268 4.63965 6.10602C4.65298 7.97268 6.11965 9.47935 7.95965 9.54602Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.33325 19.2527C7.50659 19.5593 5.49325 19.2393 4.07992 18.2927C2.19992 17.0393 2.19992 14.986 4.07992 13.7327C5.50659 12.786 7.54658 12.466 9.37325 12.786" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.0004 19.507C15.9204 19.4936 15.8271 19.4936 15.7471 19.507C13.9071 19.4403 12.4404 17.9336 12.4404 16.067C12.4404 14.1603 13.9738 12.627 15.8804 12.627C17.7871 12.627 19.3204 14.1736 19.3204 16.067C19.3071 17.9336 17.8404 19.4536 16.0004 19.507Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.12 23.707C10.24 24.9603 10.24 27.0136 12.12 28.267C14.2533 29.6936 17.7466 29.6936 19.88 28.267C21.76 27.0136 21.76 24.9603 19.88 23.707C17.76 22.2936 14.2533 22.2936 12.12 23.707Z" stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

        </svg>
    )
    /*
    <path fill={props.fill || props.stroke} stroke={props.stroke || '#323232'} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    */
}

export default IconSomeoneTable
