// Slide management
let slideIndex;

// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Add navigation with arrow keyboard
document.addEventListener("keydown", function (event) {
	switch (event.key) {
		case "ArrowLeft":
			plusSlides(-1); // Left pressed
			break;
		case "ArrowRight":
			plusSlides(1); // Right pressed
			break;
	}
});

// Thumbnail image controls
function currentSlide(n) {
	showSlides((slideIndex = n));
}

// Function to show slides
function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}

export { plusSlides, currentSlide, showSlides };
