import React, {useEffect, useState} from 'react' ;
import {ICONS} from "../../globals/Icons-svg";
import {useNavigate} from "react-router";
import IconArrowLeft from "../../globals/icons-components/IconArrowLeft";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import HapyMobileTop from "../../components/HapyMobileTop";

function Command05_Validated(props) {
    const [searchKey, setSearchKey] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={true}
                           subtitleStart="#"
                           subtitleStartClassName="text-blue"
                           subtitleEnd="27"
                           title="C’est parfait !"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/validationProgress')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <div className="text-center" style={{paddingTop:100, paddingBottom:100}}>
                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M89.707 10.6665H38.2937C26.9337 10.6665 17.707 19.9465 17.707 31.2532V106.4C17.707 116 24.587 120.053 33.0137 115.413L59.0404 100.96C61.8137 99.4132 66.2937 99.4132 69.0137 100.96L95.0404 115.413C103.467 120.107 110.347 116.053 110.347 106.4V31.2532C110.294 19.9465 101.067 10.6665 89.707 10.6665Z" stroke="#323232" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M51.1465 58.6668L59.1465 66.6668L80.4798 45.3335" stroke="#536DFE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <br/>
                    <br/>
                    Votre commande est envoyée
                </div>
                <div className="text-center inner-button-container-validate-btn">
                    <div className="validated-btn-container mt-4">
                        <HapyButtonWithIcon text="Retour à votre table" handleClick={()=>{navigate('/home')}}
                                            btnWidth={350}
                                            iconComponent={<IconArrowLeft/>}/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Command05_Validated
