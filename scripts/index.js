// @todo: Темплейт карточки
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(itemCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const nameValue = itemCard.name;
  const linkValue = itemCard.link;

  cardElement.querySelector(".card__description .card__title").textContent =
    nameValue;
  cardElement.querySelector(".card__image").setAttribute("src", linkValue);
  cardElement.querySelector(".card__image").setAttribute("alt", nameValue);
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  const removeElement = evt.target.parentElement;
  removeElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, removeCard));
});
