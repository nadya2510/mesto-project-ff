import { cardsLike } from "./api.js";

export function addCard(cardData, deleteCard, likeCard, editCard, userId) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeKol = cardElement.querySelector(".card__like-kol");
  const name = cardData.name;
  const link = cardData.link;
  const cardId = cardData._id;

  cardTitle.textContent = name;
  cardImg.setAttribute("src", link);
  cardImg.setAttribute("alt", name);
  deleteButton.addEventListener("click", () => deleteCard(cardId, cardElement));
  likeButton.addEventListener("click", () =>
    likeCard(cardElement, likeButton, cardId)
  );
  cardImg.addEventListener("click", () => editCard(cardImg));

  if (cardData.likes === undefined) {
    cardLikeKol.textContent = 0;
  } else {
    cardLikeKol.textContent = cardData.likes.length;
    const isLiked = cardData.likes.some((like) => like._id === userId);
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }
  }

  if (cardData.owner._id === userId) {
    deleteButton.classList.remove("card__delete-button_none");
  }

  return cardElement;
}


export function likeCard(cardElement, likeButton, cardId) {
  const cardLikeKol = cardElement.querySelector(".card__like-kol");

    cardsLike(cardId, likeButton.classList.contains("card__like-button_is-active")? "DELETE" : "PUT")
      .then((res) => {
        cardLikeKol.textContent = res.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");        
      })
      .catch((err) => {
        console.log(err);
      });  
}
