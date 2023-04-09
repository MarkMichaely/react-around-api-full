import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = `card__delete-btn ${
		isOwn ? "card__delete-btn-visible" : "card__delete-btn-hidden"
	}`;
	const isLiked = props.card.likes.some((user) => user._id === currentUser._id);
	const cardLikeButtonClassName = `${
		isLiked ? "card__like-btn card__like-btn-filled" : "card__like-btn"
	}`;
	function handleClick() {
		props.onCardClick(props.card);
	}
	function handleLike() {
		props.onCardLike(props.card);
	}
	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}
	return (
		<article className="card">
			<img
				alt={props.name}
				src={props.link}
				className="card__image"
				onClick={handleClick}
			/>
			<button
				className={cardDeleteButtonClassName}
				type="button"
				onClick={handleDeleteClick}
			></button>
			<div className="card__title-wrapper">
				<h2 className="card__title">{props.name}</h2>
				<div className="card__like-btn-wrapper">
					<button
						className={cardLikeButtonClassName}
						onClick={handleLike}
						type="button"
					></button>
					<h3 className="card__like-btn-counter">{props.likes}</h3>
				</div>
			</div>
		</article>
	);
}
