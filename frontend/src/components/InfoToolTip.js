import closeIcon from "../images/Close_Icon.svg";
import registerFail from "../images/cross.svg"
import registerSuccess from "../images/check.svg"

function InfoToolTip(props) {
    return (<div
        className={`popup popup_type_tool-tip ${props.isOpen ? "popup_opened" : ""
            } `}
    >
        <div className="info-tool-tip__header">
            <button
                type="button"
                className="popup__close-btn info-tool-tip__btn"
                onClick={props.onClose}
            >
                <img
                    src={closeIcon}
                    alt="close sign"
                    className="popup__close-sign"
                />
            </button>
            <img className="info-tool-tip__image "
                alt="info tool tip mark"
                src={props.isRegisterSuccessful ? registerSuccess : registerFail
                } />
            <p className="info-tool-tip__text ">{props.isRegisterSuccessful ?
                "Success! You have now been registered." :
                "Oops, something went wrong! Please try again."}</p>
        </div>
    </div>
    );

}
export default InfoToolTip;