document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("loginButton");
  const authForm = document.getElementById("authForm");
  const adminPanel = document.getElementById("adminPanel");

  const encodedUsername = "YWRtaW5mb3JtZWNlbnRyZTEyMTI=";
  const encodedPassword = "QlJZWkFOSTEyYzQ0cQ==";

  loginButton.addEventListener("click", () => {
    const enteredUsername = btoa(usernameInput.value);
    const enteredPassword = btoa(passwordInput.value);

    if (enteredUsername === encodedUsername && enteredPassword === encodedPassword) {
      authForm.style.display = "none";
      adminPanel.style.display = "block";
    } else {
      alert("Invalid credentials!");
    }
  });
});
