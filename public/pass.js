function showPasswordFunction() {
    const pass = document.getElementById("Password");
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}
