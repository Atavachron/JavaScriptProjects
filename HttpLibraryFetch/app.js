const http = new easyHTTP();

http
  .get('https://reqres.in/api/users')
  .then(data => console.log(data))
  .catch(err => console.log(err));

const user = {
  name: 'Alex',
  job: 'Chef',
};

http
  .post('https://reqres.in/api/users', user)
  .then(data => console.log(data))
  .catch(err => console.log(err));

http
  .put('https://reqres.in/api/users/1', user)
  .then(data => console.log(data))
  .catch(err => console.log(err));

http
  .delete('https://reqres.in/api/users/1')
  .then(data => console.log(data))
  .catch(err => console.log(err));
