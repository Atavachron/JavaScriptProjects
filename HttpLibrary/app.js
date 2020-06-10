//Instantiate a new EasyHTTP object
//The object will have access to all the methods we add in the EasyHTTP prototype

const http = new EasyHTTP();

// http.get('https://reqres.in/api/users', function (err, users) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(users);
//   }
// });

const data = {
  name: 'Tom',
  job: 'astronaut',
};

// http.post('https://reqres.in/api/users', data, function (err, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

// http.put('https://reqres.in/api/users/1', data, function (err, response) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(response);
//   }
// });

http.delete('https://reqres.in/api/users/1', function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(response);
  }
});
