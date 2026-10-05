const form = document.getElementById("registrationForm");
const themeToggle = document.getElementById("themeToggle");
const formMessage = document.getElementById("formMessage");

// =============================
// DARK MODE
// =============================

const savedTheme = localStorage.getItem("registration-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    localStorage.setItem(
        "registration-theme",
        isDark ? "dark" : "light"
    );

    themeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
});


// =============================
// HELPER FUNCTIONS
// =============================

function showError(input, message) {
    input.classList.add("invalid");

    const error = input.parentElement.querySelector(".error");

    if (error) {
        error.textContent = message;
    }
}

function clearError(input) {
    input.classList.remove("invalid");

    const error = input.parentElement.querySelector(".error");

    if (error) {
        error.textContent = "";
    }
}

function validateRequired(input, message) {
    if (input.value.trim() === "") {
        showError(input, message);
        return false;
    }

    clearError(input);
    return true;
}


// =============================
// LIVE VALIDATION
// =============================

const fields = form.querySelectorAll(
    "input:not([type='checkbox'])"
);

fields.forEach(input => {
    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            clearError(input);
        }
    });
});


// =============================
// FORM SUBMISSION
// =============================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let valid = true;

    formMessage.className = "message";
    formMessage.textContent = "";

    const ssNumber = document.getElementById("ssNumber");
    const email = document.getElementById("email");
    const confirmEmail =
        document.getElementById("confirmEmail");

    const userId = document.getElementById("userId");
    const confirmUserId =
        document.getElementById("confirmUserId");

    const surname = document.getElementById("surname");
    const givenName = document.getElementById("givenName");
    const birthDate = document.getElementById("birthDate");


    // =============================
    // REQUIRED FIELDS
    // =============================

    valid =
        validateRequired(
            ssNumber,
            "CRN / SS Number is required."
        ) && valid;

    valid =
        validateRequired(
            email,
            "Email is required."
        ) && valid;

    valid =
        validateRequired(
            confirmEmail,
            "Please confirm your email."
        ) && valid;

    valid =
        validateRequired(
            userId,
            "Preferred User ID is required."
        ) && valid;

    valid =
        validateRequired(
            confirmUserId,
            "Please confirm your User ID."
        ) && valid;

    valid =
        validateRequired(
            surname,
            "Surname is required."
        ) && valid;

    valid =
        validateRequired(
            givenName,
            "Given Name is required."
        ) && valid;

    valid =
        validateRequired(
            birthDate,
            "Date of Birth is required."
        ) && valid;


    // =============================
    // SS NUMBER VALIDATION
    // =============================

    if (ssNumber.value.trim() !== "") {

        const ssPattern =
            /^[0-9]{2}-?[0-9]{7}-?[0-9]$/;

        if (!ssPattern.test(ssNumber.value.trim())) {

            showError(
                ssNumber,
                "Use a valid format such as 12-3456789-0."
            );

            valid = false;
        }
    }


    // =============================
    // EMAIL VALIDATION
    // =============================

    if (email.value.trim() !== "") {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value.trim())) {

            showError(
                email,
                "Please enter a valid email address."
            );

            valid = false;
        }
    }


    // =============================
    // CONFIRM EMAIL
    // =============================

    if (
        email.value.trim() !== "" &&
        confirmEmail.value.trim() !== "" &&
        email.value.trim().toLowerCase() !==
        confirmEmail.value.trim().toLowerCase()
    ) {

        showError(
            confirmEmail,
            "Email addresses do not match."
        );

        valid = false;
    }


    // =============================
    // USER ID VALIDATION
    // =============================

    if (userId.value.trim() !== "") {

        const userIdPattern =
            /^[A-Za-z][A-Za-z0-9_]{7,19}$/;

        if (!userIdPattern.test(userId.value.trim())) {

            showError(
                userId,
                "Must be 8–20 characters, start with a letter, and use only letters, numbers, or underscore."
            );

            valid = false;
        }
    }


    // =============================
    // CONFIRM USER ID
    // =============================

    if (
        userId.value.trim() !== "" &&
        confirmUserId.value.trim() !== "" &&
        userId.value.trim() !==
        confirmUserId.value.trim()
    ) {

        showError(
            confirmUserId,
            "User IDs do not match."
        );

        valid = false;
    }


    // =============================
    // DATE OF BIRTH
    // =============================

    if (birthDate.value !== "") {

        const selectedDate =
            new Date(birthDate.value + "T00:00:00");

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {

            showError(
                birthDate,
                "Date of Birth cannot be in the future."
            );

            valid = false;
        }
    }


    // =============================
    // LOCATION CHECK
    // =============================

    const metroManila =
        document.getElementById("metroManila");

    const province =
        document.getElementById("province");

    const locationError =
        document.getElementById("locationError");


    if (
        !metroManila.checked &&
        !province.checked
    ) {

        locationError.textContent =
            "Please select Metro Manila or Province.";

        valid = false;

    } else {

        locationError.textContent = "";
    }


    // =============================
    // FINAL RESULT
    // =============================

    if (valid) {

        formMessage.className =
            "message success";

        formMessage.textContent =
            "Registration form completed successfully! This demo does not send your information to a real server.";

        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } else {

        formMessage.className =
            "message error-box";

        formMessage.textContent =
            "Please check the highlighted fields and correct the errors.";

        const firstInvalid =
            form.querySelector(".invalid");

        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});


// =============================
// RESET FORM
// =============================

form.addEventListener("reset", () => {

    setTimeout(() => {

        form.querySelectorAll("input").forEach(input => {
            input.classList.remove("invalid");
        });

        form.querySelectorAll(".error").forEach(error => {
            error.textContent = "";
        });

        formMessage.className = "message";
        formMessage.textContent = "";

    }, 0);
});