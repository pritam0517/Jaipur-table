document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // Get form data
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const people = document.getElementById('people').value;
  
    // Create a booking object
    const bookingDetails = {
      name: name,
      date: date,
      time: time,
      people: people,
    };
  
    // Store the booking details in localStorage
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(bookingDetails);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  
    // Update booking list dynamically
    renderBookings();
  
    // Show confirmation message
    document.getElementById('confirmation').classList.remove('hidden');
  
    // Clear the form
    document.getElementById('booking-form').reset();
  });
  
  // Function to render bookings
  function renderBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Get the existing booking list container
    let bookingList = document.querySelector('.booking-list');
    if (!bookingList) {
      console.error('No element with class "booking-list" found!');
      return;
    }
  
    // Clear the booking list
    bookingList.innerHTML = '<h2>Existing Bookings:</h2>';
  
    if (bookings.length > 0) {
      bookings.forEach((booking, index) => {
        const bookingItem = document.createElement('div');
        bookingItem.classList.add('booking-item');
        bookingItem.innerHTML = `
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          <p><strong>People:</strong> ${booking.people}</p>
          <button onclick="deleteBooking(${index})">Delete</button>
        
        `;
        bookingList.appendChild(bookingItem);
      });
    } else {
      const noBookingsMessage = document.createElement('p');
      noBookingsMessage.textContent = 'No bookings made yet.';
      bookingList.appendChild(noBookingsMessage);
    }
  }
  
  // Function to delete a booking
  function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  
    // Update the booking list
    renderBookings();
  }
  
  // Display bookings on page load
  window.addEventListener('load', function () {
    renderBookings();
  });
