//Fetching data from a local text file
document.getElementById('fetchText').addEventListener('click', () => {
  fetch('text.txt')
    .then(handleErrors)
    .then(res => res.text())
    .then(text => (document.querySelector('.output').innerHTML = text))
    .catch(err => console.log(err));
});

//Fetching data from local JSON file
document.getElementById('fetchJSON').addEventListener('click', () => {
  fetch('json.JSON')
    .then(handleErrors)
    .then(res => res.json())
    .then(res => {
      let output = '';
      res.forEach(person => (output += `<li>${person.name}</li>`));
      document.querySelector('.output').innerHTML = output;
    })
    .catch(err => console.log(err));
});

//Fetching the emails of all users from https://reqres.in/api/users
document.getElementById('fetchRemote').addEventListener('click', () => {
  fetch('https://reqres.in/api/users')
    .then(handleErrors)
    .then(res => res.json())
    .then(res => {
      let output = '';
      res.data.forEach(entry => (output += `<li>${entry.email}</li>`));
      document.querySelector('.output').innerHTML = output;
    })
    .catch(err => console.log(err));
});

function handleErrors(res) {
  if (!res.ok) {
    throw new Error(res.error);
  }
  return res;
}
