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

export function addCard(
  { name, link },
  deleteCard,
  likeCard,
  editCard
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardTitle.textContent = name;
  cardImg.setAttribute("src", link);
  cardImg.setAttribute("alt", name);
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => likeCard(cardElement, likeButton));
  cardImg.addEventListener("click", () => editCard(cardImg));

  return cardElement;
}


