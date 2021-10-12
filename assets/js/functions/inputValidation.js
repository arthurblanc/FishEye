const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

const errorFirst = document.getElementById("error-first");
const errorLast = document.getElementById("error-last");
const errorEmail = document.getElementById("error-email");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Regex for form validation
	const nameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*){2}$/g;
	const emailRegex = /(?=^.{5,255}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/g;
	const messageRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'-]*){20}$/g;
	let formValidated = true; // Need to be true to submit form

	// Function to check form inputs with regex and add errors messages if inputs are not validated
	function validateInput(input, regex, error) {
		const validated = input.value.match(regex);
		// If input is not validated : formValidated="false"
		if (!validated) {
			formValidated = false;
			error.style.display = "block";
			input.style.border = "0.2rem solid #fe142f";
		} else {
			error.style.display = "none";
			input.style.border = "0.05rem solid #ccc";
		}
	}

	validateInput(firstName, nameRegex, errorFirst);
	validateInput(lastName, nameRegex, errorLast);
	validateInput(email, emailRegex, errorEmail);
	validateInput(message, messageRegex, errorMessage);

	// Issue #4 : confirmation message
	// If form is validated, hide form and show confirmation message
	if (formValidated) {
		confirmation.style.display = "block";
		form.style.display = "none";
	}
});
