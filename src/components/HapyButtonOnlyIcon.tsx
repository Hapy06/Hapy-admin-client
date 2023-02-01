import React from 'react' ;

type PropsType = {
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number;
    btnClass?: string ;
    isChecked: boolean ;
    fillColor?: '#536DFE' | '#FF6063' ;
}

function HapyButtonOnlyIcon(props:PropsType) {
    return (
        <>
            <button className={"hapy-btn-with-icon text-center " + props.btnClass} onClick={props.handleClick} style={{width:props.btnWidth}}>
                <span className="float-start checked-icon-component" >{props.iconComponent}</span>
                { props.isChecked && (
                    <span className="float-end checked-icon-on-btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="24" height="24" rx="12" fill={props.fillColor || '#536DFE'}/>
                        <path d="M7 12L10.3294 15L17 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                )}
            </button>
        </>
    )
}
export default HapyButtonOnlyIcon
