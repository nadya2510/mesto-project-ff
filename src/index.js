import "./pages/index.css";
import { initialCards} from "./components/cards.js";
import { removeCard, likeCard, addCard } from "./components/card.js";
import { openModal, closeModal, addEventModal } from "./components/modal.js";

// DOM узлы
//Список карточек
const placesList = document.querySelector(".places__list");
//Редактировать профиль
const buttonTypeEdit = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");
const editProfile = document.forms["edit-profile"];
const nameInput = editProfile.elements.name;
const jobInput = editProfile.elements.description;
//Новое место
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonNewCard = document.querySelector(".profile__add-button");
const newPlace = document.forms["new-place"];
//Нажатие на картинку
const popupTypeImage = document.querySelector(".popup_type_image"); 
const popupImage = popupTypeImage.querySelector(".popup__image");

// Вывести список карточек на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, removeCard, likeCard, editImg));
});

//Добавим слушатели для popup
addEventModal(popupNewCard);
addEventModal(popupTypeImage);
addEventModal(popupTypeEdit);

// Добавим событие для кнопки "Редактировать профиль"
buttonTypeEdit.addEventListener("click", () => {
  //Заполним поля профиля с формы
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  //Откроем
  openModal(popupTypeEdit);
});

// Добавим событие для кнопки "Новое место"
buttonNewCard.addEventListener("click", () => {
  openModal(popupNewCard);
});

newPlace.addEventListener("submit",(evt) => {
  handleCardSubmit(evt);
});

editProfile.addEventListener("submit",(evt) => {
  handleProfileSubmit(evt);
}); 

function editImg(cardImg) {
  //Просмотр картинки  
  popupImage.setAttribute("src", cardImg.getAttribute("src"));
  popupImage.setAttribute("alt", cardImg.getAttribute("alt"));
  openModal(popupTypeImage);
}

function handleCardSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const name = evt.target.elements["place-name"].value;
  const link = evt.target.elements.link.value;
  const item = { name, link };
  placesList.prepend(
    addCard(item, removeCard, likeCard, editImg)
  );
  //Очистили форму
  evt.target.reset();
  closeModal(popupNewCard);
}

function handleProfileSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. 
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}




