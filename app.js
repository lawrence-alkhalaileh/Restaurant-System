class Customer {
  constructor(fullName, password, dob, gender, phone, orderTypes, orderOption, imageUrl) {
    this.fullName = fullName;
    this.password = password;
    this.dob = dob;
    this.gender = gender;
    this.phone = phone;
    this.orderTypes = orderTypes;
    this.orderOption = orderOption;
    this.imageUrl = imageUrl;
  }
}

document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();


  const fullName = document.getElementById('fullName').value;

  if (/\s/.test(fullName)) {
    alert('Full Name cannot contain spaces. Please enter a valid name.');
    fullName.style.borderColor = 'red'; 
    return;
  }


  const password = document.getElementById('password').value;
 

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/;

  if (!passwordRegex.test(password)) {
    alert('Password must be more than 8 characters, include at least one number, one uppercase letter, and one special character.');
    password.style.borderColor = 'red'; 
    return;
  }

  const dob = document.getElementById('dob').value;
  const birthdayRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  if (!birthdayRegex.test(dob)) {
    alert('Birthday must be in the format YYYY-MM-DD (e.g., 1995-08-25) and must represent a valid date.');
    dob.style.borderColor = 'red'; 
    return;
  }

  const Email = document.getElementById("Email").value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    Email.style.borderColor = 'red'; 
    event.preventDefault();
  }

  const gender = document.querySelector('input[name="gender"]:checked').value;

  const phone = document.getElementById('phone').value;
  const phoneRegex = /^07\d{8}$/;

  if (!phoneRegex.test(phone)) {
    alert('Phone number must be 10 digits and start with 07.');
    event.preventDefault();
  }
  const orderTypes = [];
  document.querySelectorAll('input[name="orderType"]:checked').forEach(input => {
    orderTypes.push(input.value);
  });


  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;
  const imageUrl = document.getElementById('image').value;

  const newCustomer = new Customer(
    fullName,
    password,
    dob,
    gender,
    phone,
    orderTypes,
    orderOption,
    imageUrl
  );

  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(newCustomer);

  localStorage.setItem('orders', JSON.stringify(orders));

  renderCustomer(newCustomer);

  this.reset();
  alert('Order submitted successfully!');
});

function renderCustomer(customer) {
  const container = document.getElementById('cardsContainer');

  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
      <img src="${customer.imageUrl}" alt="${customer.fullName}'s image">
      <h3>${customer.fullName}</h3>
      <p><strong>Gender:</strong> ${customer.gender}</p>
      <p><strong>Order:</strong> ${customer.orderTypes.join(', ')}</p>
      <p><strong>Option:</strong> ${customer.orderOption}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
    `;

  container.appendChild(card);
}

function loadExistingCustomers() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.forEach(order => renderCustomer(order));
}

loadExistingCustomers();

