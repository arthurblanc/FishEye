/* TO CONTTENT BTN*/
const toContentBtn = document.getElementById("to-content-btn");
//toContentBtn.classList.add("to-content-btn-show");

window.addEventListener("scroll", checkScrollPosition);

function checkScrollPosition() {
	if (window.pageYOffset >= 20) {
		toContentBtn.classList.add("to-content-btn-show");
	} else {
		toContentBtn.classList.remove("to-content-btn-show");
	}
}
