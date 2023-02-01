import React from 'react' ;

type PropsType = {
    handleClick: any ;
    number:number | string;
    btnWidth?:number;
    isChecked?: boolean ;
    fillColor?: '#536DFE' | '#FF6063' ;
    marginRight?: number ;
    marginLeft?: number ;
    marginBottom?: number ;
    marginTop?: number ;
    state?: 'free' | 'full' | string ;
}

function HapyHoteTableItem(props:PropsType) {
    return (
        <>
            <button className={props.state != 'full' ? 'hapy-btn-with-icon text-center' : 'hapy-btn-with-icon text-center border-green'} onClick={props.handleClick}
                    style={{width:props.btnWidth, marginLeft:props.marginLeft, marginRight:props.marginRight,
                            marginBottom:props.marginBottom, marginTop:props.marginTop}}>
                { props.isChecked && (
                    <span className="reservation-icon-on-item Mb-2">
                        <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_630_2661)">
                            <rect x="11" y="11" width="32" height="32" rx="16" fill="#4ECDC4"/>
                            </g>
                            <path d="M24.333 20.3333V22.3333" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M29.667 20.3333V22.3333" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M31.1333 33.2667C32.3115 33.2667 33.2667 32.3115 33.2667 31.1333C33.2667 29.9551 32.3115 29 31.1333 29C29.9551 29 29 29.9551 29 31.1333C29 32.3115 29.9551 33.2667 31.1333 33.2667Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M33.6667 33.6667L33 33" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21.333 25.0601H32.6663" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M27.9133 33.6666H24.3333C22 33.6666 21 32.3333 21 30.3333V24.6666C21 22.6666 22 21.3333 24.3333 21.3333H29.6667C32 21.3333 33 22.6666 33 24.6666V27.6666" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M26.9967 28.1334H27.0027" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M24.5299 28.1334H24.5359" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M24.5299 30.1334H24.5359" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                            <defs>
                            <filter id="filter0_d_630_2661" x="0" y="0" width="54" height="54" filterUnits="userSpaceOnUse" colorInterpolation-filters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_630_2661"/>
                            <feOffset/>
                            <feGaussianBlur stdDeviation="4"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_630_2661"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_630_2661" result="shape"/>
                            </filter>
                            </defs>
                        </svg>
                    </span>
                )}
                <span>{props.number}</span>
            </button>
        </>
    )
}
export default HapyHoteTableItem
