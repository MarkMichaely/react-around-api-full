import closeIcon from "../images/Close_Icon.svg";

export default function PopupWithImage(props) {
	return (
		<div
			className={`popup popup_type_${props.name} ${
				props.isOpen ? "popup_opened" : ""
			} `}
		>
			<div className="popup__image-wrapper">
				<button
					type="button"
					className="popup__close-btn popup__close-btn_type_image"
					onClick={props.onClose}
				>
					<img
						src={closeIcon}
						alt="close sign"
						className="popup__close-sign popup__close-sign_type_image"
					/>
				</button>
				<img
					alt={props.selectedCard.name}
					className="popup__card-image"
					src={props.selectedCard.link}
				/>
				<h2 className="popup__card-title">{props.selectedCard.name}</h2>
			</div>
		</div>
	);
}
