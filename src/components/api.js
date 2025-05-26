const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "3185e797-84bb-45e6-9886-e50e66f615c9",
    "Content-Type": "application/json",
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const setUser = (nameUser, aboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const setCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const cardsLike = (cardId, methodLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodLike,
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const setAvatar = (avatarUser) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUser,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((err) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};
