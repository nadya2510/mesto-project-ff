import "./pages/index.css";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUser,
  setUser,
  setCard,
  deleteCard,
  setAvatar,
} from "./components/api.js";
import { addCard, likeCard } from "./components/card.js";
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
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let userId;
let userAvatar;
let cardForDelete = {};
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//Удаление карточки
const popupDelCard = document.querySelector(".popup_type_del-card");
const delCard = document.forms["del-card"];
//Редактирование аватара
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const editAvatar = document.forms["edit-avatar"];
const profileImage = document.querySelector(".profile__image");
const linkInput = editAvatar.elements.link;
//Получим массив карточек и _id пользователя для их отображения
const promises = [getInitialCards(), getUser()];
Promise.all(promises)
  .then((results) => {
    // Вывести список карточек на страницу
    const initialCards = results[0];
    const initialUser = results[1];
    userId = initialUser._id;
    userAvatar = initialUser.avatar;
    initialCards.forEach((item) => {
      placesList.append(addCard(item, removeCard, likeCard, editImg, userId));
    });
    profileTitle.textContent = initialUser.name;
    profileDescription.textContent = initialUser.about;
    profileImage.setAttribute("style", `background-image: url(${userAvatar})`);
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//Добавим слушатели для popup
addEventModal(popupNewCard);
addEventModal(popupTypeImage);
addEventModal(popupTypeEdit);
addEventModal(popupDelCard);
addEventModal(popupEditAvatar);
enableValidation(validationConfig);

// Добавим событие для кнопки "Редактировать профиль"
buttonTypeEdit.addEventListener("click", () => {
  //Заполним поля профиля с формы
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent; 
  clearValidation(popupTypeEdit, validationConfig);
  //Откроем
  openModal(popupTypeEdit);
});

// Добавим событие для аватарки "Редактировать аватар"
profileImage.addEventListener("click", () => {
  linkInput.value = userAvatar;
  clearValidation(popupEditAvatar, validationConfig);
  //Откроем
  openModal(popupEditAvatar);
});

// Добавим событие для кнопки "Новое место"
buttonNewCard.addEventListener("click", (evt) => {
  popupNewCard.querySelector(".popup__form").reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

newPlace.addEventListener("submit", (evt) => {
  handleCardSubmit(evt);
});

editProfile.addEventListener("submit", (evt) => {
  handleProfileSubmit(evt);
});

delCard.addEventListener("submit", (evt) => {
  handleRemoveCardSubmit(evt);
});

editAvatar.addEventListener("submit", (evt) => {
  handlEditAvatarSubmit(evt);
});

function editImg(cardImg) {
  //Просмотр картинки
  popupImage.setAttribute("src", cardImg.getAttribute("src"));
  popupImage.setAttribute("alt", cardImg.getAttribute("alt"));
  openModal(popupTypeImage);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector(".popup__button").textContent = "Сохранение...";
  const name = evt.target.elements["place-name"].value;
  const link = evt.target.elements.link.value;
  setCard(name, link)
    .then((res) => {
      placesList.prepend(addCard(res, removeCard, likeCard, editImg, userId));
      closeModal(popupNewCard);
    })    
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      evt.target.querySelector(".popup__button").textContent = "Сохранить";
    });
}

function handleProfileSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector(".popup__button").textContent = "Сохранение...";
  setUser(nameInput.value, jobInput.value)
    .then(() => {
      nameProfile.textContent = nameInput.value;
      jobProfile.textContent = jobInput.value;      
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      evt.target.querySelector(".popup__button").textContent = "Сохранить";
    });
}

function removeCard(cardId, cardElement) {
  cardForDelete = {
    id: cardId,
    cardElement,
  };
  openModal(popupDelCard);
}

function handleRemoveCardSubmit(evt) {
  evt.preventDefault();
  if (!cardForDelete.cardElement) return;

  deleteCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closeModal(popupDelCard);
      cardForDelete = {};
    })
    .catch((err) => {
      console.log(err);
    });
}

function handlEditAvatarSubmit(evt) {
  evt.preventDefault();
  evt.target.querySelector(".popup__button").textContent = "Сохранение...";
  setAvatar(linkInput.value)
    .then(() => {
      profileImage.setAttribute(
        "style",
        `background-image: url(${linkInput.value})`
      );     
      userAvatar = linkInput.value;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      evt.target.querySelector(".popup__button").textContent = "Сохранить";
    });
}

