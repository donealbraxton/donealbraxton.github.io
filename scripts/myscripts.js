const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

alert("Page Opened.");

loginButton.addEventListener("click", (e) => {
    
    alert("Registered Click.");
    e.preventDefault();
    const email = loginForm.text.value;
    const password = loginForm.password.value;

    if (email === "don@gmail.com" && password === "password") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        alert("You have clicked the Sign in Button.");
        loginErrorMsg.style.opacity = 1;
    }
})