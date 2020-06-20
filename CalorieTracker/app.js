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
    logData() {
      return data;
    },
  };
})();

//UI Controller

const UICtrl = (function () {
  //Public Methods
  return {};
})();

//App Controller

const App = (function (ItemCtrl, UICtrl) {
  //Public methods
  return {
    init() {
      console.log('Initializing App');
    },
  };
})(ItemCtrl, UICtrl);

App.init();
