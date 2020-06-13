//Instantiate the classes
const github = new Github();
const ui = new UI();

//DOM Variables
const searchUser = document.getElementById('searchUser');

//Event Listener on the Input Field
searchUser.addEventListener('keyup', e => {
  //Get the text from the input
  const userText = e.target.value;

  //Check that the text from the input is not an empty string
  //For example if you use backspace to delete the first character
  //the event will still be fired and an empty string will be passed
  if (userText !== '') {
    //Make the http call
    github.getUser(userText).then(data => {
      if (data.profile.message === 'Not Found') {
        //Show alert that the user does not exist
        ui.showAlert('The user does not exist', 'alert alert-danger');
      } else {
        //Show the user profile
        ui.showProfile(data.profile);
      }
    });
  } else {
    //Clear the displayed profile if the input string is empty
    ui.clearProfile();
  }
});
