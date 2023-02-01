import React, {useState} from 'react';
import {useNavigate} from "react-router";
import HapySearch from "../../components/HapySearch";
import HapyButtonWithoutIcon from "../../components/HapyButtonWithoutIcon";
import HapyButtonWithIcon from "../../components/HapyButtonWithIcon";
import IconVerify from "../../globals/icons-components/IconVerify";
import IconArrowDown from "../../globals/icons-components/IconArrowDown";
import HapyMobileTop from "../../components/HapyMobileTop";

function Command01_Category(props) {
    const [searchKey, setSearchKey] = useState<string>('');
    const [showValidateBtn, setShowValidateBtn] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSearchForm = (e) => {
        const { name, value } = e.target;
        setSearchKey(value) ;
        setShowValidateBtn(!showValidateBtn) ;
    } ;

    const handleNavigate = () => {

    }

    return (
        <>
            <HapyMobileTop showWelcome2AndMenu={true}
                           subtitleStart="#"
                           subtitleStartClassName="text-blue"
                           subtitleEnd="27"
                           title="Servez-vous"
                           showBtnBack={true}
                           handleClickBtnBack={()=>navigate('/home')}
                           showRightSideBtn={false}
                           hapyLogoBtnColor={"#536DFE"}

            />
            <div className="happy-div-bottom">
                <div className="pt-4">
                    <HapySearch inputValue={searchKey} handleChange={handleSearchForm}/>
                </div>
                <br/>
                <h5>Entrée</h5>
                <br/>
                <HapyButtonWithoutIcon text="Salade" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <HapyButtonWithoutIcon text="Chips" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <HapyButtonWithoutIcon text="Poisson" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <HapyButtonWithoutIcon text="Frites" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <HapyButtonWithoutIcon text="Option 5" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <HapyButtonWithoutIcon text="Option 6" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <HapyButtonWithoutIcon text="Option 7" handleClick={()=>{navigate('/command/sub-category')}}/>
                <br/> <br/> <br/>
                <div className={showValidateBtn ? "text-center inner-button-container-validate-btn" : "text-center inner-button-container"}>
                    <IconArrowDown width={32} height={32} stroke={'black'} styleIcon={showValidateBtn ? {marginTop:-30} : {marginTop:30}} />
                    {showValidateBtn && (
                        <div className="validated-btn-container">
                            <HapyButtonWithIcon text="Valider votre commande" handleClick={()=>{navigate('/command/validationProgress')}}
                                                      btnWidth={350}
                                                      iconComponent={<IconVerify width={32} height={32} stroke={'black'}/>}/>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
}
export default Command01_Category
