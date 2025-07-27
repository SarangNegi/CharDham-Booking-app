document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const dham = document.getElementById("location").value;
  const date = document.getElementById("travelDate").value;
  const people = parseInt(document.getElementById("noOfPersons").value);
  const travelMode = document.getElementById("travelMode").value;

  const dhamRates = {
    "Yamunotri": 800,
    "Gangotri": 1000,
    "Kedarnath": 1500,
    "Badrinath": 1300,
    "All Four": 4500
  };

  const modeRates = {
    "Bus": 0,
    "Private Car": 500,
    "Helicopter": 3000
  };

  const dhamPrice = dhamRates[dham] || 0;
  const travelExtra = modeRates[travelMode] || 0;
  const totalCost = (dhamPrice + travelExtra) * people;

  const booking = {
    name,
    email,
    dham,
    date,
    people,
    travelMode,
    totalCost
  };

  let bookings = JSON.parse(localStorage.getItem("yatraBookings")) || [];
  bookings.push(booking);
  localStorage.setItem("yatraBookings", JSON.stringify(bookings));

  const confirm = document.getElementById("confirmation");
  confirm.classList.remove("hidden");
  confirm.innerHTML = `
    <strong>Booking Confirmed!</strong><br>
    ${people} person(s) for <strong>${dham}</strong><br>
    Mode: ${travelMode} | Date: ${date}<br>
    Total Cost: ₹${totalCost}<br>
    Confirmation sent to: ${email}
  `;

  document.getElementById("bookingForm").reset();
  document.getElementById("priceDisplay").classList.add("hidden");
});

["location", "noOfPersons", "travelMode"].forEach(id =>
  document.getElementById(id).addEventListener("change", updatePrice)
);

function updatePrice() {
  const dham = document.getElementById("location").value;
  const travel = document.getElementById("travelMode").value;
  const count = parseInt(document.getElementById("noOfPersons").value);

  const dhamRates = {
    "Yamunotri": 800,
    "Gangotri": 1000,
    "Kedarnath": 1500,
    "Badrinath": 1300,
    "All Four": 4500
  };
  const modeRates = {
    "Bus": 0,
    "Private Car": 500,
    "Helicopter": 3000
  };

  if (dham && travel && count) {
    const total = (dhamRates[dham] + modeRates[travel]) * count;
    document.getElementById("totalPrice").textContent = total;
    document.getElementById("priceDisplay").classList.remove("hidden");
  }
}
// Handle cancellation
document.getElementById('cancelBtn').addEventListener('click', function () {
  const form = document.getElementById('bookingForm');
  form.reset();

  const confirmation = document.getElementById('confirmation');
  confirmation.classList.remove('hidden');
  confirmation.innerHTML = `
    ❌ <strong>Booking Cancelled.</strong><br>
    Your registration has been cleared.
  `;
});

