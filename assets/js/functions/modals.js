// Launch modal event
const modalbg = document.querySelector(".call-to-action-modal");
const modalBtn = document.querySelectorAll("#call-to-action-button");
const modalCloseBtn = document.querySelectorAll(".close1");
const confirmationCloseBtn = document.querySelectorAll("#confirmation-btn-close");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// Issue #1 : close modal
// Close modal on click on X
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));
// Close modal on click on confirmation button
confirmationCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal with a display="none"
function closeModal() {
	modalbg.style.display = "none";
}
