import React from 'react' ;

type PropsType = {
    text:string ;
    handleClick: any ;
    iconComponent:any ;
    btnWidth?:number;
}

function HapyButtonIconNumber(props:PropsType) {
    return (
        <>
            <button className="hapy-btn-with-icon row" onClick={props.handleClick} style={{width:props.btnWidth, paddingLeft:20}}>
                <span className="col-6 mt-3">{props.iconComponent}</span>
                <span className="col-6" style={{marginTop:20,fontSize:16}}>{props.text}</span>
            </button>
        </>
    )
}
export default HapyButtonIconNumber
