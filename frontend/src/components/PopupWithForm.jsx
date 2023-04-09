import closeIcon from "../images/Close_Icon.svg";
export default function PopupWithForm(props) {
	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.isOpen ? "popup_opened" : ""
			} `}
		>
			<div className="popup__box">
				<div className="popup__header">
					<h2 className="popup__title">{props.title}</h2>
					<button
						className={`popup__close-btn popup__close-btn_type_${props.name}`}
						type="button"
						onClick={props.onClose}
					>
						<img src={closeIcon} alt="close button" className="popup__close-sign" />
					</button>
				</div>
				<form
					onSubmit={props.onSubmit}
					className={`form form_type_${props.name}`}
					name={`${props.name}-form`}
				>
					{props.children}
					<fieldset className="form__fieldset form__fieldset_type_submit">
						<button className="form__button" type="submit">
							{props.buttonText}
						</button>
					</fieldset>
				</form>
			</div>
		</div>
	);
}
