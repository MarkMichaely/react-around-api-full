import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup(props) {
	const [name, setName] = React.useState("");
	const [link, setLink] = React.useState("");

	function handleNameChange(e) {
		setName(e.target.value);
	}
	function handleLinkChange(e) {
		setLink(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.onAddPlaceSubmit({ name: name, link: link });
	}

	React.useEffect(() => {
		setName("");
		setLink("");
	}, [props.isOpen]);
	return (
		<PopupWithForm
			name={"card"}
			title={"New place"}
			isOpen={props.isOpen}
			onClose={props.onClose}
			buttonText={props.isLoading ? "Saving..." : "Create"}
			onSubmit={handleSubmit}
		>
			<fieldset className="form__fieldset">
				<input
					type="text"
					id="place"
					name="place"
					className="form__input form__input_type_place"
					placeholder="Title"
					required
					maxLength="30"
					minLength="1"
					value={name || ""}
					onChange={handleNameChange}
				/>
				<span className="form__input-error place-error"></span>
			</fieldset>
			<fieldset className="form__fieldset">
				<input
					type="url"
					id="link"
					name="link"
					className="form__input form__input_type_link"
					placeholder="Image link"
					required
					value={link || ""}
					onChange={handleLinkChange}
				/>
				<span className="form__input-error link-error"></span>
			</fieldset>
		</PopupWithForm>
	);
}
