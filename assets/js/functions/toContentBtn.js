// TO CONTENT BTN
const toContentBtn = $("#to-content-btn")[0];

// Function to show/hide to-content-btn when scrolling
function checkScrollPosition() {
	if (window.pageYOffset >= 20) {
		toContentBtn.classList.add("to-content-btn-show");
	} else {
		toContentBtn.classList.remove("to-content-btn-show");
	}
}

window.addEventListener("scroll", checkScrollPosition);
