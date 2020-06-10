//Fetching data from a local text file
document.getElementById('fetchText').addEventListener('click', function () {
  fetch('text.txt')
    .then(function (res) {
      return res.text();
    })
    .then(function (text) {
      document.querySelector('.output').innerHTML = text;
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Fetching data from local JSON file
document.getElementById('fetchJSON').addEventListener('click', function () {
  fetch('json.JSON')
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      let output = '';
      res.forEach(function (person) {
        output += `<li>${person.name}</li>`;
      });
      document.querySelector('.output').innerHTML = output;
    })
    .catch(function (err) {
      console.log(err);
    });
});

//Fetching the emails of all users from https://reqres.in/api/users
document.getElementById('fetchRemote').addEventListener('click', function () {
  fetch('https://reqres.in/api/users')
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      let output = '';
      res.data.forEach(function (entry) {
        output += `<li>${entry.email}</li>`;
      });
      document.querySelector('.output').innerHTML = output;
    })
    .catch(function (err) {
      console.log(err);
    });
});
