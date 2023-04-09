import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const imageRef = React.useRef(currentUser.avatar);

	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateAvatar({
			avatar: imageRef.current.value,
		});
	}

	React.useEffect(() => {
		imageRef.current.value = "";
	}, [props.isOpen]);
	return (
		<PopupWithForm
			name={"avatar"}
			title={"Update profile picture"}
			isOpen={props.isOpen}
			onClose={props.onClose}
			buttonText={props.isLoading ? "Saving..." : "Save"}
			onSubmit={handleSubmit}
		>
			<fieldset className="form__fieldset">
				<input
					type="url"
					id="avatar-link"
					name="avatar-link"
					className="form__input form__input_type_link"
					placeholder="Avatar link"
					required
					ref={imageRef}
				/>
				<span className="form__input-error avatar-link-error"></span>
			</fieldset>
		</PopupWithForm>
	);
}
