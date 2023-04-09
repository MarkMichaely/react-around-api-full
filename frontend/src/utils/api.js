class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;

	}

	_checkResponse(res) {
		if (res.ok) {
			return res.json();
		} else return Promise.reject(`Error ${res.status}`);
	}

	_request = (url, options) => fetch(url, options).then(this._checkResponse);

	getUserInfo(token) {
		return this._request(`http://localhost:3001/users/me`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
		});
	}
	getInitialCards(token) {
		return this._request(`http://localhost:3001/cards`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
		});
	}
	setUserInfo({ name, about }, token) {
		return this._request(`http://localhost:3001/users/me`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: `${name}`,
				about: `${about}`,
			}),
		});
	}

	addCard({ name, link }, token) {
		return this._request(`http://localhost:3001/cards`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				link: link,
			}),
		});
	}
	removeCard(cardId, token) {
		return this._request(`http://localhost:3001/cards/${cardId}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
		});
	}

	changeLikeCardStatus(cardId, isLiked, token) {
		if (!isLiked) {
			return this._request(`http://localhost:3001/cards/${cardId}/likes`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
					'accept': 'application/json',

					Authorization: `Bearer ${token}`
				},
			});
		} else {
			return this._request(`http://localhost:3001/cards/${cardId}/likes`, {
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json',
					'accept': 'application/json',
					Authorization: `Bearer ${token}`
				},
			});
		}
	}

	setAvatar(link, token) {
		return this._request(`http://localhost:3001/users/me/avatar`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'accept': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				avatar: link,
			}),
		});
	}

}
const baseUrl = "http://localhost:3001";
const headers = {
	"Content-Type": "application/json"
};
export const api = new Api({ baseUrl, headers }
);
