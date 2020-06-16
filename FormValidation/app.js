const name = document.querySelector('#name');
const email = document.querySelector('#email');
const zip = document.querySelector('#zip');
const phone = document.querySelector('#phone');

//Regular expression matching letters only with a length of between 2 and 10
name.addEventListener('blur', () => validateInput(name, /^[A-Za-z]{2,10}$/));

//Regular expression machin five digits followed by optional dash and four digits
zip.addEventListener('blur', () =>
  validateInput(zip, /^[0-9]{5}(-[0-9]{4})?$/)
);

//Regular expression matching an email format. The escape character must be used for dash and dot
email.addEventListener('blur', () =>
  validateInput(
    email,
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  )
);

//Regular Expression matchin xxx-xxx-xxxx, xxx.xxx.xxxx, with optional brackets or no delimiter
phone.addEventListener('blur', () =>
  validateInput(phone, /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/)
);

function validateInput(input, re) {
  if (!re.test(input.value)) {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
  }
}
