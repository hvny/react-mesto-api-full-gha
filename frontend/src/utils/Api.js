class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                credentials: "include",
                method: "GET",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*добавление карточки*/
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
                credentials: "include",
                method: "POST",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(res => this._checkForError(res));
    }

    /*удаление карточки*/
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
                credentials: "include",
                method: "DELETE",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*получение данных юзера*/
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                credentials: "include",
                method: "GET",
                headers: this._headers,
            })
            .then(res => this._checkForError(res));
    }

    /*обновление данных юзера*/
    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                credentials: "include",
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data.about
                })
            })
            .then(res => this._checkForError(res));
    }

    /*обновление аватарки */
    setUserAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                credentials: "include",
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.avatar
                })
            })
            .then(res => this._checkForError(res));
    }

    /*ставим и убираем лайк*/
    changeLikeCardStatus(cardId, isLiked){
        if(!isLiked){
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                credentials: "include",
                method: 'DELETE',
                headers: this._headers,
            })
            .then(res => this._checkForError(res))
        }
        else{
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                credentials: "include",
                method: 'PUT',
                headers: this._headers,
            })
            .then(res => this._checkForError(res))
        }
    }

    /*проверка на ошибку*/
    _checkForError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export const api = new Api({
    baseUrl: "https://api.hvny-web.students.nomoreparties.co",
    headers: {
        authorization: "107572fd-a23a-435b-9724-668d3d26cd42",
        "Content-Type": "application/json"
    }
});