const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingfor: 'female',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    name: 'Janet Smith',
    age: 27,
    gender: 'female',
    lookingfor: 'male',
    location: 'Chicago IL',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    name: 'Scott Daw',
    age: 29,
    gender: 'male',
    lookingfor: 'female',
    location: 'Miami FL',
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
];

//Iterator
function userIterator(users) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < users.length
        ? { value: users[nextIndex++], done: false }
        : { done: true };
    },
  };
}

const users = userIterator(data);
//Display the first user on page load
displayUser();

//Add an event listener to the Next button

document.getElementById('next').addEventListener('click', displayUser);

function displayUser() {
  const currentUser = users.next().value;

  if (currentUser !== undefined) {
    document.getElementById('profile').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name: ${currentUser.name}</li>
      <li class="list-group-item">Age: ${currentUser.age}</li>
      <li class="list-group-item">Preference: ${currentUser.gender} looking for ${currentUser.lookingfor}</li>
      <li class="list-group-item">Location: ${currentUser.location}</li>
    </ul>
  `;

    document.getElementById(
      'image'
    ).innerHTML = `<img src="${currentUser.image}">`;
  } else {
    //If no more profiles, reload the page
    window.location.reload();
  }
}
