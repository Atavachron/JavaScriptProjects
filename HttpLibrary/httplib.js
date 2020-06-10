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

EasyHTTP.prototype.post = function (url, data, callback) {
  this.xhr.open('POST', url, true);
  this.xhr.setRequestHeader('Content-Type', 'application/json');
  let self = this;
  this.xhr.onload = function () {
    callback(null, self.xhr.response);
  };

  this.xhr.send(JSON.stringify(data));
};

EasyHTTP.prototype.put = function (url, data, callback) {
  this.xhr.open('PUT', url, true);
  this.xhr.setRequestHeader('Content-Type', 'application/json');
  let self = this;
  this.xhr.onload = function () {
    callback(null, self.xhr.response);
  };
  this.xhr.send(JSON.stringify(data));
};

EasyHTTP.prototype.delete = function (url, callback) {
  this.xhr.open('DELETE', url, true);
  let self = this;
  this.xhr.onload = function () {
    if (self.xhr.status === 200 || self.xhr.status === 204) {
      callback(null, 'Entry Deleted');
    } else {
      callback('Error:' + self.xhr.status);
    }
  };
  this.xhr.send();
};
