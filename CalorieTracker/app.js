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
  };
})();

//UI Controller

const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
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
  };
})();

//App Controller

const App = (function (ItemCtrl, UICtrl) {
  //Public methods
  return {
    init() {
      //Fetch items from the data structure
      const items = ItemCtrl.getItems();

      //Populate the list with items
      UICtrl.populateItemList(items);
    },
  };
})(ItemCtrl, UICtrl);

App.init();
