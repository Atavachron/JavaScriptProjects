//Create a constructor function for an object with one property which is an XMLHttpRequest object

function EasyHTTP() {
  this.xhr = new XMLHttpRequest();
}

//Add methods to the prototype

EasyHTTP.prototype.get = function (url, callback) {
  this.xhr.open('GET', url, true);

  //If we use an arrow function we will not need to do the following line;
  let that = this;
  this.xhr.onload = function () {
    if (that.xhr.status === 200) {
      //We pass null as the first argument, because there is no error
      callback(null, that.xhr.response);
    } else {
      callback('Error' + that.xhr.status);
    }
  };

  this.xhr.send();
};
