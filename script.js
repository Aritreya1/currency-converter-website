function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultBox = document.getElementById("result");

  resultBox.classList.remove("show");

  if (isNaN(amount) || amount <= 0) {
    resultBox.textContent = "Please enter a valid amount.";
    resultBox.classList.add("show");
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/067bccc8df472c61dc77257c/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      if (data.result === "success") {
        const rate = data.conversion_rates[to];
        const converted = (amount * rate).toFixed(2);
        setTimeout(() => {
          resultBox.textContent = `${amount} ${from} = ${converted} ${to}`;
          resultBox.classList.add("show");
        }, 100);
      } else {
        resultBox.textContent = "Failed to fetch rates.";
        resultBox.classList.add("show");
      }
    })
    .catch(() => {
      resultBox.textContent = "Error connecting to API.";
      resultBox.classList.add("show");
    });
}

// 🌙 Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}