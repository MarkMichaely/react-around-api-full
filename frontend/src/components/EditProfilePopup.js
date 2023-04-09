import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const [name, setName] = React.useState(currentUser.name);
	const [description, setDescription] = React.useState(currentUser.about);

	React.useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, props.isOpen]);

	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handleDescriptionChange(e) {
		setDescription(e.target.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
		props.onUpdateUser({ name, about: description });
	}
	return (
		<PopupWithForm
			name={"edit"}
			title={"Edit Form"}
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			buttonText={props.isLoading ? "Saving..." : "Save"}
		>
			<fieldset className="form__fieldset">
				<input
					type="text"
					id="name"
					name="name"
					className="form__input form__input_type_name"
					placeholder="Name Surname"
					required
					maxLength="40"
					minLength="2"
					value={name || ""}
					onChange={handleNameChange}
				/>
				<span className="form__input-error name-error"></span>
			</fieldset>
			<fieldset className="form__fieldset">
				<input
					type="text"
					id="description"
					name="description"
					className="form__input form__input_type_description"
					placeholder="Description"
					required
					maxLength="200"
					minLength="2"
					value={description || ""}
					onChange={handleDescriptionChange}
				/>
				<span className="form__input-error description-error"></span>
			</fieldset>
		</PopupWithForm>
	);
}
