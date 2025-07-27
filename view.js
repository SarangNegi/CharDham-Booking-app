document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("bookingList");
  const bookings = JSON.parse(localStorage.getItem("yatraBookings")) || [];

  if (bookings.length === 0) {
    list.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  bookings.forEach((b) => {
    const entry = document.createElement("div");
    entry.style.border = "5px solid #ccc";
    entry.style.padding = "10px";
    entry.style.marginBottom = "10px";
    entry.style.borderRadius = "6px";
    entry.style.backgroundColor ="green";

    entry.innerHTML = `
      <strong>${b.name}</strong> (${b.email})<br>
      📍 <strong>${b.dham}</strong> on ${b.date}<br>
      🚍 Mode: ${b.travelMode}<br>
      🧍‍♂️ People: ${b.people}<br>
      💰 ₹${b.totalCost}
    `;
    list.appendChild(entry);
  });
});
