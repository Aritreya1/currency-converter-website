// 👇 New function to handle inputs like "2 lakh", "1.5 million", etc.
function parseHumanReadableAmount(input) {
    const units = {
        lakh: 1e5,
        crore: 1e7,
        million: 1e6,
        billion: 1e9,
        thousand: 1e3,
    };

    input = input.toLowerCase().trim().replace(/\s+/g, ""); // normalize spaces and lowercase

    for (const unit in units) {
        const regex = new RegExp(`(\\d+(\\.\\d+)?)${unit}s?`, 'i'); // match "2.5lakhs", "3million", etc.
        const match = input.match(regex);
        if (match) {
            const number = parseFloat(match[1]);
            return number * units[unit];
        }
    }

    // Fallback if no keyword detected
    const fallback = parseFloat(input.replace(/,/g, ""));
    return isNaN(fallback) ? 0 : fallback;
}

// Function to fetch and convert currency
const convertCurrency = async () => {
    const userInput = document.getElementById("amount").value;
    const amount = parseHumanReadableAmount(userInput); // 👈 Updated line
    const from = document.getElementById("fromCurrency").value;
    const to = document.getElementById("toCurrency").value;
    const resultBox = document.getElementById("result");

    // Clear previous result and show loading state
    resultBox.classList.remove("show");
    resultBox.textContent = "Converting...";

    if (isNaN(amount) || amount <= 0) {
        resultBox.textContent = "Please enter a valid amount.";
        resultBox.classList.add("show");
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/067bccc8df472c61dc77257c/latest/${from}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[to];
            const converted = (amount * rate).toFixed(2);
            resultBox.textContent = `${amount.toLocaleString()} ${from} = ${converted} ${to}`;
        } else {
            resultBox.textContent = "Failed to fetch rates. Please try again.";
        }
    } catch (error) {
        resultBox.textContent = "Error connecting to the currency API.";
    } finally {
        // Show result after a short delay for animation
        setTimeout(() => {
            resultBox.classList.add("show");
        }, 100);
    }
};

// Toggle Dark Mode function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS animations
    AOS.init();

    // Attach click listener to the convert button
    document.getElementById("convertBtn").addEventListener("click", convertCurrency);

    // Attach click listener to the dark mode toggle
    document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
});
