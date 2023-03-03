import React, {useEffect, useState} from 'react' ;
import IconArrowRight from "../globals/icons-components/IconArrowRight";
import IconArrowDown from "../globals/icons-components/IconArrowDown";
import IconChecked from "../globals/icons-components/IconChecked";

type Option = {
    text:string ;
    value:any ;
}

type PropsType = {
    labelText: string ;
    labelTextEdited: string ;
    optionList: Option[] ;
    selectValues: any[] ;
    setSelectValues: any ;
    isLabelPresent? : boolean ;
    label?: string ;
    required?: boolean ;
    selectWidth?: number ;
}

function HapyMultiSelect(props:PropsType) {

    const [isDropdowned, setIsDropdowned] = useState<boolean>(false);
    const [optionSelectedList, setOptionSelectedList] = useState<any[]>(props.selectValues || []);
    const [initialOptionList, setInitialOptionList] = useState<Option[]>(props.optionList || []) ;

    useEffect(() => {
        setInitialOptionList(props.optionList) ;
        console.log(props.optionList)
    }, [isDropdowned]) ;

    const handleChangeOption = (option: Option) => {
        let temp = [...optionSelectedList] ;
        if (temp.includes(option.value)) {
            temp = temp.filter(elt => elt != option.value) ;
        } else {
            temp.push(option.value) ;
        }
        setOptionSelectedList(temp) ;
        props.setSelectValues(temp) ;
    } ;


    return (
        <>
            {props.isLabelPresent && (
                <label className="fw-5" style={{width: props.selectWidth || 366}}>
                    <span className="float-start">{props.label}</span>
                    { props.required && (<span style={{color: '#536DFE'}} className="float-end f-12">Obligatoire</span>) }
                </label>
            )}

            {isDropdowned ? (
                <div className="hapy-select-dropdown f-16 fw-5">
                    <div onClick={()=>setIsDropdowned(false)} style={{cursor:"pointer"}}>
                        <span className="mr-32"><IconArrowDown/></span>
                        <span>{props.labelText}</span>
                    </div>
                    {initialOptionList.map( (option, index) => (
                        <div key={index} className="hapy-select-option" style={{cursor:"pointer"}}>
                            {optionSelectedList.includes(option.value) ? (
                                <span className="mr-32"><IconChecked stroke="white" fill="#536DFE" /></span>
                            ) : (
                                <span className="mr-64"></span>
                            )}
                            <span className={optionSelectedList.includes(option.value) ? 'text-blue' : ''}
                                  onClick={()=>handleChangeOption(option)}>{option.text}</span>
                        </div>
                    ) )}
                </div>

            ) : (
                <div style={{cursor:"pointer"}} className="hapy-btn-with-icon hapy-select-default f-16 fw-5" onClick={()=>setIsDropdowned(true)}>
                    <span className="mr-32"><IconArrowRight/></span>
                    {optionSelectedList.length > 0 ? (
                        <span className="text-blue">{props.labelTextEdited}</span>
                    ) : (
                        <span>{props.labelText}</span>
                    )}
                </div>
            )}
        </>
    )
}
export default HapyMultiSelect
