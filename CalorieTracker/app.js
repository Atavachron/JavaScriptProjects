//Storage Controller

const StorageCtrl = (function () {
  return {
    storeItem(item) {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items'));
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    },

    getItemsFromStorage() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }

      return items;
    },
  };
})();

//Item Controller

const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure
  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  //Public methods
  return {
    getItems() {
      return data.items;
    },
    logData() {
      return data;
    },
    addItem(name, calories) {
      //Create ID
      let ID;
      if (data.items.length > 0) {
        //Create ID by adding one to the id of the last element of the array
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Convert calories to number
      calories = parseInt(calories);

      //Create New Item
      const newItem = new Item(ID, name, calories);

      data.items.push(newItem);
      return newItem;
    },

    getItemById(id) {
      let found = null;
      data.items.forEach(item => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem(name, calories) {
      calories = parseInt(calories);

      let found = null;
      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },

    deleteItem(id) {
      //Get all Ids
      const ids = data.items.map(item => item.id);

      //Get index
      const index = ids.indexOf(id);

      //Remove based on index
      data.items.splice(index, 1);
    },

    clearAllItems() {
      data.items = [];
    },

    setCurrentItem(item) {
      data.currentItem = item;
    },

    getCurrentItem() {
      return data.currentItem;
    },

    getTotalCalories() {
      //Calculate the total
      let total = data.items.reduce((acc, meal) => {
        return acc + meal.calories;
      }, 0);

      //Set the totalCalories in data
      data.totalCalories = total;

      return data.totalCalories;
    },
  };
})();

//UI Controller

const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
    listItems: '#item-list li',
    clearBtn: '.clear-btn',
  };

  //Public Methods
  return {
    populateItemList(items) {
      let output = '';
      items.forEach(item => {
        output += `
        <li id="item-${item.id}" class="collection-item">
        <strong>${item.name}: </strong><em>${item.calories} calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = output;
    },

    getSelectors() {
      return UISelectors;
    },

    addListItem(item) {
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';

      //Create element
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}: </strong><em>${item.calories} calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>
      `;
      //Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },

    updateListItem(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Loop through the node list
      listItems = Array.from(listItems);
      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute('id');

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = ` <strong>${item.name}: </strong><em>${item.calories} calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },

    deleteListItem(id) {
      const itemID = `#item-${id}`;

      const item = document.querySelector(itemID);
      item.remove();
    },

    getItemInput() {
      //Return the input as an object
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    clearInputs() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;

      UICtrl.showEditState();
    },

    removeItems() {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      //Turn node list into array
      listItems = Array.from(listItems);
      listItems.forEach(item => item.remove());
    },

    hideList() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories(calories) {
      document.querySelector(UISelectors.totalCalories).textContent = calories;
    },

    clearEditState() {
      UICtrl.clearInputs();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
  };
})();

//App Controller

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  //Load event Listeners
  const loadEventListeners = function () {
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);

    //Disable enter key
    document.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        return false;
      }
    });

    //Update item click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditClick);

    //Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);

    //Back button event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', UICtrl.clearEditState);

    //Delete button event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);

    //Clear button event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', clearAllItemsClick);
  };

  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput();

    //Check the inputs
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      UICtrl.addListItem(newItem);

      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.showTotalCalories(totalCalories);

      //Store in local storage
      StorageCtrl.storeItem(newItem);

      UICtrl.clearInputs();
    }

    e.preventDefault();
  };

  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      //Get the the id of the list item (the id in the markup)
      const listId = e.target.parentNode.parentNode.id;

      //Get the actual ID by breakinf the markup id into an array and accessing the second element of the array

      const listIdArr = listId.split('-');
      const id = parseInt(listIdArr[1]);

      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);

      UICtrl.addItemToForm();
    }

    e.preventDefault();
  };

  const itemUpdateSubmit = function (e) {
    const input = UICtrl.getItemInput();

    //Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update UI

    UICtrl.updateListItem(updatedItem);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  const itemDeleteSubmit = function (e) {
    const currentItem = ItemCtrl.getCurrentItem();

    //Delete from Data Structure
    ItemCtrl.deleteItem(currentItem.id);

    //Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  const clearAllItemsClick = function () {
    //Delete all items from Data Structure
    ItemCtrl.clearAllItems();

    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);

    //Remove from UI
    UICtrl.removeItems();

    //Hide UL
    UICtrl.hideList();
  };

  //Public methods
  return {
    init() {
      //Set initial state/clear state
      UICtrl.clearEditState();

      //Fetch items from the data structure
      const items = ItemCtrl.getItems();

      //Check if there are any items, and if not, hide the list (removes the line)
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        //Populate the list with items
        UICtrl.populateItemList(items);
      }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Display the total calories
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    },
  };
})(ItemCtrl, StorageCtrl, UICtrl);

App.init();
