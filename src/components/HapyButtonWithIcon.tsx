import React from 'react' ;

type PropsType = {
    text:string ;
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number | string;
    btnClass?: string ;
    numberAtEnd?: number | string ;
    numberAtEndColor?: '#FF6063' | '#536DFE' | '#F7B927';
    textColor?: '#FF6063' | '#536DFE' | '#F7B927';
}

function HapyButtonWithIcon(props:PropsType) {
    console.log('number at end', props.numberAtEnd)
    return (
        <>
            <button className={'hapy-btn-with-icon vertical-center ' + props.btnClass} onClick={props.handleClick} style={{width:props.btnWidth || '100%'}}>
                <span className="float-start" style={{marginLeft:32, marginRight:32}} >{props.iconComponent}</span>
                <span className="float-start fw-5 f-16" style={{color:props.textColor || '#323232'}}>{props.text}</span>
                {/* {props.numberAtEnd && (<span className="mr-32" style={{color:props.numberAtEndColor, marginLeft:"auto"}}>{props.numberAtEnd}</span>)} */}
                {(<span className="mr-32" style={{color:props.numberAtEndColor, marginLeft:"auto"}}>{props.numberAtEnd}</span>)}
            </button>
        </>
    )
}
export default HapyButtonWithIcon
