import { closeModal, openModal } from "./modal.js";
export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function removeCard(card) {
  card.remove();
}

export function likeCard(card, likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}

export function editImg(cardImg, popupTypeImage) {
  //Нажатие на картинку
  const popupImage = popupTypeImage.querySelector(".popup__image");
  popupImage.setAttribute("src", cardImg.getAttribute("src"));
  popupImage.setAttribute("alt", cardImg.getAttribute("alt"));
  openModal(popupTypeImage);
}

export function addCard(
  { name, link },
  deleteCard,
  likeCard,
  editCard,
  popupTypeImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(
    ".card__description .card__title"
  );
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = name;
  cardImg.setAttribute("src", link);
  cardImg.setAttribute("alt", name);
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => likeCard(cardElement, likeButton));
  cardImg.addEventListener("click", () => editCard(cardImg, popupTypeImage));

  return cardElement;
}

// Обработчик «отправки» формы
export function handleCardSubmit(
  evt,
  placesList,
  popupNewCard,
  popupTypeImage
) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = evt.target.elements["place-name"].value;
  const link = evt.target.elements.link.value;
  const item = { name, link };
  placesList.prepend(
    addCard(item, removeCard, likeCard, editImg, popupTypeImage)
  );
  //Очистили форму
  evt.target.reset();
  closeModal(popupNewCard);
}
