import React from "react";
import Card from "./Card";
import editVector from "../images/edit_vector.svg";
import editButton from "../images/Edit_Button.svg";
import addVector from "../images/add_Vector.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main className="main">
			<section className="profile">
				<div
					className="profile__avatar"
					onClick={props.onEditAvatarClick}
					style={{ backgroundImage: `url(${currentUser.avatar})` }}
				>
					<img
						src={editVector}
						alt="pen icon"
						className="profile__avatar-edit-icon"
					/>
				</div>
				<div className="profile-info">
					<div className="profile-info__wrapper">
						<h1 className="profile-info__name">{currentUser.name}</h1>
						<button
							type="button"
							className="profile-info__btn"
							aria-label="edit button"
							onClick={props.onEditProfileClick}
						>
							<img
								className="profile-info__edit-button"
								src={editButton}
								alt="edit-button"
							/>
						</button>
					</div>
					<p className="profile-info__description">{currentUser.about}</p>
				</div>
				<button
					className="profile__add-btn"
					aria-label="add button"
					type="button"
					onClick={props.onAddPlaceClick}
				>
					<img className="profile__add-sign" src={addVector} alt="add-button" />
				</button>
			</section>

			<section className="elements">
				{props.cards.map((card) => {
					return (
						<Card
							key={card._id}
							card={card}
							name={card.name}
							link={card.link}
							likes={card.likes.length}
							onCardClick={props.onCardClick}
							onCardLike={props.onCardLike}
							onCardDelete={props.onCardDelete}
						/>
					);
				})}
			</section>
		</main>
	);
}
