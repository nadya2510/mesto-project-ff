import "./pages/index.css";
import { initialCards, removeCard, likeCard, editImg, addCard, handleCardSubmit } from "./components/cards.js";
import { handleProfileSubmit, openProfile } from "./components/profile.js";
import { openModal } from "./components/modal.js";
// Темплейт карточки
// DOM узлы
//Список карточек
const placesList = document.querySelector(".places__list");
//Редактировать профиль
const popupTypeEdit = document.querySelector(".popup_type_edit");
const buttonTypeEdit = document.querySelector(".profile__edit-button");
const editProfile = document.forms["edit-profile"];
const profileInfo =document.querySelector(".profile__info");
//Новое место
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonNewCard = document.querySelector(".profile__add-button");
const newPlace = document.forms["new-place"];
//Нажатие на картинку
const popupTypeImage = document.querySelector(".popup_type_image"); 


// Вывести список карточек на страницу
initialCards.forEach((item) => {
  placesList.append(addCard(item, removeCard, likeCard, editImg, popupTypeImage));
});;

// Добавим событие для кнопки "Редактировать профиль"
buttonTypeEdit.addEventListener("click", (evt) => {
  openProfile(editProfile, profileInfo);
  openModal(popupTypeEdit);
});

//popupTypeEdit.addEventListener("submit", handleTypSubmit );

// Добавим событие для кнопки "Новое место"
buttonNewCard.addEventListener("click", () => {
  openModal(popupNewCard);
});

newPlace.addEventListener("submit",(evt) => {
  handleCardSubmit(evt, placesList, popupNewCard, popupTypeImage);
});
editProfile.addEventListener("submit",(evt) => {
  handleProfileSubmit(evt, profileInfo, popupTypeEdit);
});  
