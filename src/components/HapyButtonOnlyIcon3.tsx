import React from 'react' ;

type PropsType = {
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number;
    isChecked: boolean ;
    fillColor?: '#536DFE' | '#FF6063' ;
    marginRight?: number ;
    marginLeft?: number ;
    classAddtionnal?: string ;
}

function HapyButtonOnlyIcon3(props:PropsType) {
    return (
        <>
            <button className={props.classAddtionnal ? 'hapy-btn-with-icon text-center ' + props.classAddtionnal : 'hapy-btn-with-icon text-center'} onClick={props.handleClick}
                    style={{width:props.btnWidth, marginLeft:props.marginLeft, marginRight:props.marginRight}}>
                { props.isChecked && (
                    <span className="checked-icon-on-btn-3 -mb-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill={props.fillColor || '#536DFE'}/>
                        <path d="M7 12L10.3294 15L17 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                )}
                <span>{props.iconComponent}</span>
            </button>
        </>
    )
}
export default HapyButtonOnlyIcon3
