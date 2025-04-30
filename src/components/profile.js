// Обработчик «отправки» формы
import { closeModal } from "./modal.js";

export function handleProfileSubmit(evt, profileInfo, popupTypeEdit) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  const nameProfile = profileInfo.querySelector(".profile__title");
  const jobProfile = profileInfo.querySelector(".profile__description");

  nameProfile.textContent = evt.target.elements.name.value;
  jobProfile.textContent = evt.target.elements.description.value;

  closeModal(popupTypeEdit);
}

export function openProfile(editProfile, profileInfo) {
  const nameInput = editProfile.elements.name;
  const jobInput = editProfile.elements.description;

  const nameProfile = profileInfo.querySelector(".profile__title");
  const jobProfile = profileInfo.querySelector(".profile__description");

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}
