// @todo: Темплейт карточки
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function addCard(itemCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__description .card__title");
  const cardButton = cardElement.querySelector(".card__delete-button");
  const nameValue = itemCard.name;
  const linkValue = itemCard.link;

  cardTitle.textContent = nameValue;
  cardImg.setAttribute("src", linkValue);
  cardImg.setAttribute("alt", nameValue);
  cardButton.addEventListener("click", () =>  deleteCard(cardElement));
  
  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(card) { 
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, removeCard));
});
