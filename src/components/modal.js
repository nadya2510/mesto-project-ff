const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened"); // находим открытый попап
    closeModal(popup);
  }
};

export const addEventModal = (modal) => {
  const buttonClose = modal.querySelector(".popup__close");
  // ищем кнопку крестик в попапе
  buttonClose.addEventListener("click", () => {
    closeModal(modal);
  });

  modal.addEventListener("mousedown", (event) => {
    // если event.target содержит класс "popup", то закрываем
    if (event.target.classList.contains("popup")) {
      closeModal(modal);
    }
  });
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-animated");
  modal.classList.add("popup_is-opened");
  // добавить слушатель на кнопку Escape
  document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
  // удалить класс открытия попапа
  modal.classList.remove("popup_is-opened");
  // удалить слушатель на кнопку Escape
  document.removeEventListener("keyup", handleEscKeyUp);
};
