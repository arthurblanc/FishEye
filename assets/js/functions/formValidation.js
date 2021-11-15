form.addEventListener("submit", (e) => {
	// Prevent submit form
	e.preventDefault();
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	const form = $("#form")[0];
	const firstName = $("#first")[0];
	const lastName = $("#last")[0];
	const email = $("#email")[0];
	const message = $("#message")[0];
	const confirmation = $("#confirmation")[0];

	// Regex for form validation
	const nameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*){2}$/g;
	const emailRegex = /(?=^.{5,255}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/g;
	let formValidated = true; // Need to be true to submit form

	// Function to check form inputs with regex and add errors messages if inputs are not validated
	function validateInput(input, regex) {
		const validated = input.value.match(regex);
		// If input is not validated : formValidated="false"
		if (!validated) {
			formValidated = false;
		}
	}

	validateInput(firstName, nameRegex);
	validateInput(lastName, nameRegex);
	validateInput(email, emailRegex);

	// Show confirmation message and hide form if form is validated
	if (form.checkValidity() && formValidated) {
		confirmation.style.display = "block";
		form.style.display = "none";
		console.log("Prenom : " + firstName.value + ", Nom : " + lastName.value + ", Email : " + email.value + ", Message : " + message.value);
	}
	form.classList.add("was-validated");
});
