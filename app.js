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
  
    // Collect form data
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const phone = document.getElementById('phone').value;
  
    const orderTypes = Array.from(
      document.querySelectorAll('input[name="orderType"]:checked')
    ).map(input => input.value);
  
    const orderOption = document.querySelector('input[name="orderOption"]:checked').value;
    const imageUrl = document.getElementById('image').value;
  
    // Create new customer
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
  
    // Retrieve existing orders or initialize
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(newCustomer);
  
    // Save orders back to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
  
    // Render the new customer card
    renderCustomer(newCustomer);
  
    // Reset form
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
  
  // Initial render of existing customers
  function loadExistingCustomers() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => renderCustomer(order));
  }
  
  loadExistingCustomers();
  