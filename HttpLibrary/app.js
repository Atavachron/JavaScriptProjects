//Instantiate a new EasyHTTP object
//The object will have access to all the methods we add in the EasyHTTP prototype

const http = new EasyHTTP();

http.get('https://jsonplaceholder.typicode.com/users', function (err, users) {
  if (err) {
    console.log(err);
  } else {
    console.log(users);
  }
});
