const email = document.getElementById("mail");
const form = document.querySelector("form");
const emailError = document.querySelector("#mail + span.error");
let country = document.getElementById("country").value;
let ZIPField = document.getElementById("ZIP");
const ZIPError = document.querySelector("#zip + span.error");
const Pass = document.getElementById("password");
const PassError = document.querySelector("#password + span.error");
const ConfirmPass = document.getElementById("confirmPassword");
const ConfirmPassError = document.querySelector("#confirmPassword + span.error");

email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
    } else {
        showError();
    }
});


Pass.addEventListener("input", (event) => {
    if (Pass.validity.valid) {
        PassError.textContent = "";
        PassError.className = "error";
    } else {
        showError();
    }
});

form.addEventListener("submit", (event) => {
    if(!email.validity.valid) {
        showError();
        event.preventDefault();
    }
    else if(!ZIPField.validity.valid) {
        showError();
        event.preventDefault();
    }
    else if(!Pass === ConfirmPass && Pass !== '') {
        showError();
        event.preventDefault();
    }
});

function showError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address";
    }
    else if (email.validity.typeMismatch) {
        emailError.textContent = "Value needs to be email address";
    }
    else if (email.validity.tooShort) {
        emailError.textContent = `email should be at least ${email.minLength} characters, you entered ${email.value.length}`;
    }
    else if (ZIPField.validity.valueMissing) {
        ZIPError.textContent = "You need to enter ZIP";
    }
    else if (Pass.validity.valueMissing) {
        PassError.textContent = "You need to enter password";
    }
    else if (Pass !== ConfirmPass) {
        PassError.textContent = "Password and Confirm Password need to be the same";
    }
    
    emailError.classname = "error active";
}

function checkZIP() {
    const constraints = {
        DE: [
            "^(D-)?\\d{5}$",
            "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
        ],
        FR: [
            "^(F-)?\\d{5}$",
            "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
        ],
        USA: [
            "^(F-)?\\d{5}$",
            "USA ZIPs must have exactly 5 digits: e.g. F-75012 or 11561",
        ]
    };
    country = document.getElementById("country").value;
    ZIPField = document.getElementById("ZIP");
    const constraint = new RegExp(constraints[country][0], "");
    console.log(constraint);

    if (constraint.test(ZIPField.value)) {
        ZIPField.setCustomValidity("");
    } else {
        ZIPField.setCustomValidity(constraints[country][1]);
    }
}

window.onload = () => {
    document.getElementById("country").onchange = checkZIP;
    document.getElementById("ZIP").oninput = checkZIP;
}