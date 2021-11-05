import { filters } from "../functions/filters.js";
import { mediasOfThisPhotograph } from "../photographer-page.js";
import { photographer } from "../photographer-page.js";
import { id } from "../photographer-page.js";

// Async function to render lightbox
const renderLightbox = async () => {
	const modalContent = $("#modal-content")[0];
	// Remove existing Lightbox
	const mySlides = document.getElementsByClassName("mySlides");
	while (mySlides.length > 0) {
		mySlides[0].parentNode.removeChild(mySlides[0]);
	}
	// Filter medias in lightbox
	if (filters.length != 0) {
		let data = "(";
		for (let i = 0; i < filters.length; i++) {
			let newData = "objet.tags == '" + filters[i].substring(1) + "'";
			if (i > 0) {
				data = data + " || " + newData;
			}
			if (i === 0) {
				data = data + newData;
			}
		}
		data = data + ")";
		var medias = mediasOfThisPhotograph.filter((objet) => objet.photographerId == id && eval(data));
	} else {
		var medias = mediasOfThisPhotograph.filter((objet) => objet.photographerId == id);
	}

	// Add filtered picture in lightbox
	for (let item in medias) {
		// Add function to open the modal on the right picture
		const imgOnClick = document.getElementById(medias[item].id);
		if (imgOnClick != null) {
			imgOnClick.setAttribute("onclick", "currentSlide(" + (+[item] + 1) + ")");
		}

		const mySlides = newElement("div", modalContent, { class: "mx-auto my-0 mySlides" });
		const numberText = newElement("div", mySlides, { class: "py-2 px-3 numbertext" }, +[item] + 1 + " / " + medias.length);
		if (medias[item].image != null) {
			const photographerMedias = newElement("img", mySlides, {
				class: "rounded-top modal-img",
				src: "assets/img/" + photographer.name + "/" + medias[item].image,
				alt: medias[item].description,
			});
			const photographerMediasTitle = newElement("div", mySlides, { class: "rounded-bottom py-2 px-3 caption-container" }, medias[item].title);
		} else if (medias[item].video != null) {
			let photographerMediasVideoContainer = newElement("video", mySlides, { class: "rounded-top modal-img", width: "100%", height: "auto", controls: "true" });
			const photographerMediasVideo = newElement("source", photographerMediasVideoContainer, {
				src: "assets/img/" + photographer.name + "/" + medias[item].video,
				alt: medias[item].description,
				type: "video/mp4",
			});
			const photographerMediasVideoTitle = newElement("div", mySlides, { class: "rounded-bottom py-2 px-3 caption-container" }, medias[item].title);
		}
	}

	// Add prev and next button
	const carouselControlPrev = newElement("button", modalContent, { id: "carousel-control-prev", class: "carousel-control-prev", type: "button", onclick: "plusSlides(-1)" });
	const carouselControlPrevIcon = newElement("span", carouselControlPrev, { class: "carousel-control-prev-icon", "aria-hidden": "true" });
	const carouselControlPrevSR = newElement("span", carouselControlPrev, { class: "visually-hidden" }, "Previous");
	const carouselControlNext = newElement("button", modalContent, { id: "carousel-control-next", class: "carousel-control-next", type: "button", onclick: "plusSlides(1)" });
	const carouselControlNextIcon = newElement("span", carouselControlNext, { class: "carousel-control-next-icon", "aria-hidden": "true" });
	const carouselControlNextSR = newElement("span", carouselControlNext, { class: "visually-hidden" }, "next");
};

// Slide management
let slideIndex;

// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides((slideIndex = n));

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

export { renderLightbox, plusSlides, currentSlide, showSlides };
