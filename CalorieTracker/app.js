//Storage Controller

//Item Controller

const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  //Data Structure
  const data = {
    items: [
      { id: 0, name: 'Beef Stroganoff', calories: 1200 },
      { id: 1, name: 'Green Salad', calories: 300 },
      { id: 2, name: 'Ice Cream', calories: 500 },
    ],
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
  };
})();

//UI Controller

const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
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

    getItemInput() {
      //Return the input as an object
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },
  };
})();

//App Controller

const App = (function (ItemCtrl, UICtrl) {
  //Load event Listeners
  const loadEventListeners = function () {
    //Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput();

    //Check the inputs
    if (input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    e.preventDefault();
  };

  //Public methods
  return {
    init() {
      //Fetch items from the data structure
      const items = ItemCtrl.getItems();

      //Populate the list with items
      UICtrl.populateItemList(items);

      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
