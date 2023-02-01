import React, {useEffect, useState} from 'react' ;
import IconArrowRight from "../globals/icons-components/IconArrowRight";
import IconArrowDown from "../globals/icons-components/IconArrowDown";

type Option = {
    text:string ;
    value:any ;
}

type PropsType = {
    defaultOption?: Option ;
    optionList: Option[] ;
    isLabelPresent? : boolean ;
    label?: string ;
    required?: boolean ;
    selectWidth?: number ;
    selectValue: any ;
    setSelectValue: any ;
}

export default HapySelect
function HapySelect(props:PropsType) {

    const [isDropdowned, setIsDropdowned] = useState<boolean>(false);
    const [optionSelected, setOptionSelected] = useState<Option>( props.optionList.find(elt => elt.value == props.selectValue)
        || props.defaultOption || {text:'Choisir', value:null});

    useEffect(() => {
        if (props.selectValue) {
            setOptionSelected(props.optionList.find(elt => elt.value == props.selectValue))
        } else if (props.defaultOption) {
            setOptionSelected(props.defaultOption)
        } else {
            setOptionSelected({text:'Choisir', value:null}) ;
        }
        // console.log(optionSelected)
    }, [props.selectValue])

    const handleChangeOption = (option: Option) => {
        props.setSelectValue(option.value) ;
        setOptionSelected(option) ;
        setIsDropdowned(!isDropdowned) ;
    } ;

    return (
        <>
            {props.isLabelPresent && (
                <label className="fw-4" style={{width: props.selectWidth || '100%'}}>
                    <span className="float-start">{props.label}</span>
                    { props.required && (<span style={{color: '#536DFE'}} className="float-end fw-3 f-12">Obligatoire</span>) }
                </label>
            )}
            {isDropdowned ? (
                <div className="hapy-select-dropdown scroll-and-hidden" style={{maxHeight:250,width: props.selectWidth || '100%'}}>
                    <div onClick={()=>setIsDropdowned(false)} style={{cursor:"pointer"}}>
                        <span className="mr-32"><IconArrowDown/></span>
                        <span>{optionSelected?.text}</span>
                    </div>
                    {/*<div className="hapy-select-option" style={{cursor:"pointer"}}>
                        <span className="mr-64"></span>
                        <span onClick={()=>handleChangeOption(props.defaultOption || {text:'Choisir', value:null})}>{props.defaultOption?.text || 'Choisir'}</span>
                    </div>*/}
                    {props.optionList.map( (option, index) => (
                        <div key={index} className="hapy-select-option" style={{cursor:"pointer"}}>
                            <span className="mr-64"></span>
                            <span className={option == optionSelected ? 'text-blue' : ''}
                                  onClick={()=>handleChangeOption(option)}>{option.text}</span>
                        </div>
                    ) )}
                </div>

            ) : (
                <div style={{cursor:"pointer",width: props.selectWidth || '100%'}} className="hapy-btn-with-icon vertical-center pl-3" onClick={()=>setIsDropdowned(!isDropdowned)}>
                    <span className="mr-32"><IconArrowRight/></span>
                    <span className={(props.defaultOption == optionSelected || optionSelected?.text == 'Choisir') ? '' : 'text-blue'}>
                        {optionSelected?.text || props.defaultOption?.text || 'Choisir'}</span>
                </div>
            )}
        </>
    )
}
