function generatePassword() {
    var length = document.getElementById("length").value;
    var useAlphabet = document.getElementById("alphabet").checked;
    var useDigits = document.getElementById("digits").checked;
    var useSymbols = document.getElementById("symbols").checked;

    var characters = '';
    var password = '';

    if (useAlphabet) characters += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useDigits) characters += '0123456789';
    if (useSymbols) characters += '!@#$%^&*()-_=+[]{}|;:\'",.<>?/';

    if (!characters) {
        showError("Please select at least one character type.");
        return;
    }

    for (var i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    showPassword(password);

    var strength = checkStrength(password);
    showStrength(strength);
}

function showError(message) {
    document.getElementById("password-output").style.color = "red";
    document.getElementById("password-output").innerHTML = message;
}

function showPassword(password) {
    document.getElementById("password-output").style.color = "black";
    document.getElementById("password-output").innerHTML = "Generated Password: " + password;
}

function checkStrength(password) {
    var strength = 0;

    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*()-_=+[\]{}|;:'",.<>?/]/.test(password)) strength++;

    return strength;
}

function showStrength(strength) {
    var strengthIndicator = document.getElementById("strength-indicator");
    strengthIndicator.innerHTML = "Password Strength: " + strength + "/4";

    if (strength === 4) {
        strengthIndicator.style.color = "green";
        strengthIndicator.innerHTML += " - Strong Password!";
    } else {
        strengthIndicator.style.color = "red";
        strengthIndicator.innerHTML += " - Password could be stronger.";
    }
    
}

function copyPassword() {
    var passwordOutput = document.getElementById("password-output").innerText;

    if (passwordOutput) {
        navigator.clipboard.writeText(passwordOutput).then(() => {
            alert('Password copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    } else {
        alert('No password to copy.');
    }
}

