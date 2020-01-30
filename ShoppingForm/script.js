const shoppingForm = document.querySelector(".shopping");
const list = document.querySelector(".list");

let items = [];

//Functions

function handleSubmit(e) {
  e.preventDefault();
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    id: Date.now(),
    complete: false
  };

  items.push(item);
  console.log(`There are now ${items.length} items in your list`);

  e.target.reset();

  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function displayItems() {
  const html = items
    .map(
      item => `<li class="shopping-item">
      <input value="${item.id}" type="checkbox" ${item.complete && "checked"}>
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}" value="${
        item.id
      }">&times;</button>
  </li>`
    )
    .join("");
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem("items"));
  if (lsItems.length) {
    items.push(...lsItems);
    list.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function deleteItem(id) {
  console.log("deleted", id);
  items = items.filter(item => item.id !== id);
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsComplete(id) {
  const itemRef = items.find(item => item.id === id);
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent("itemsUpdated"));
}

//Event Listeners

shoppingForm.addEventListener("submit", handleSubmit);
list.addEventListener("itemsUpdated", displayItems);
list.addEventListener("itemsUpdated", mirrorToLocalStorage);
list.addEventListener("click", event => {
  const id = parseInt(event.target.value);
  if (event.target.matches("button")) {
    deleteItem(id);
  }
  if (event.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
