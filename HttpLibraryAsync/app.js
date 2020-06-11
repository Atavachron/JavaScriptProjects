const http = new EasyHTTP();

http.get('https://reqres.in/api/users').then(data => console.log(data));

const user = { name: 'Alex', job: 'Chef' };

http.post('https://reqres.in/api/users', user).then(data => console.log(data));

http.put('https://reqres.in/api/users/2', user).then(data => console.log(data));

http.delete('https://reqres.in/api/users/2').then(data => console.log(data));
