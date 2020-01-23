const buttons = document.querySelectorAll(".card button");
const modalInner = document.querySelector(".modal-inner");
const modalOuter = document.querySelector(".modal-outer");

function handleClick(e) {
  const button = e.currentTarget;
  const card = button.closest(".card");

  const imgSrc = card.querySelector("img").src;
  const desc = card.dataset.description;
  const name = card.querySelector("h2").textContent;

  //populate the modal with the new info
  modalInner.innerHTML = `
    <img width="600" height="600" src="${imgSrc.replace(
      "200",
      "600"
    )}" alt="${name}"/>
    <p>${desc}</p>
  `;

  //show the modal
  modalOuter.classList.add("open");
}

buttons.forEach(button => button.addEventListener("click", handleClick));

function closeModal() {
  modalOuter.classList.remove("open");
}

modalOuter.addEventListener("click", e => {
  const isOutside = !e.target.closest(".modal-inner");
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeModal();
  }
});
