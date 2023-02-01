import React from 'react' ;

type PropsType = {
    textBtn1:string ;
    textBtn2:string ;
    handleClickBtn1: any ;
    handleClickBtn2: any ;
    activeBtn: 'btn1' | 'btn2' ;
}

function Hapy2ButtonSwitching(props:PropsType) {
    const classBtnActive: string = 'hapy-btn-without-icon col-6' ;
    const classBtnNotActive: string = 'text-white hapy-2btnSwitching-secondBtn text-center col-6' ;
    return (
        <div className="hapy-2btnSwitching row" style={{cursor:"pointer"}}
             >
            <button className={props.activeBtn == 'btn1' ? classBtnActive : classBtnNotActive}
                    onClick={props.handleClickBtn1}>{props.textBtn1}</button>
            <button className={props.activeBtn == 'btn2' ? classBtnActive : classBtnNotActive}
                    onClick={props.handleClickBtn2}>{props.textBtn2}</button>
        </div>
    )
}
export default Hapy2ButtonSwitching
