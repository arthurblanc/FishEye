import { filters } from "../functions/filters.js";
import { mediasOfThisPhotograph } from "../photographer-page.js";
import { photographer } from "../photographer-page.js";
import { id } from "../photographer-page.js";

/* LIGHTBOX FUNCTION */
const renderLightbox = async () => {
	const modalContent = document.getElementById("modal-content");
	// Remove existing Lightbox
	const mySlides = document.getElementsByClassName("mySlides");
	while (mySlides.length > 0) {
		mySlides[0].parentNode.removeChild(mySlides[0]);
	}

	if (filters.length != 0) {
		let datadata = "(";

		for (let i = 0; i < filters.length; i++) {
			let newData = "objet.tags == '" + filters[i].substring(1) + "'";
			if (i > 0) {
				datadata = datadata + " || " + newData;
			}
			if (i === 0) {
				datadata = datadata + newData;
			}
		}

		datadata = datadata + ")";
		var medias = mediasOfThisPhotograph.filter((objet) => objet.photographerId == id && eval(datadata));
		console.log(medias);
	} else {
		var medias = mediasOfThisPhotograph.filter((objet) => objet.photographerId == id);
	}

	for (let item in medias) {
		// render lightbox
		const imgOnClick = document.getElementById(medias[item].id);
		if (imgOnClick != null) {
			imgOnClick.setAttribute("onclick", "openModal();currentSlide(" + (+[item] + 1) + ")");
		}

		const mySlides = newElement("div", modalContent, { class: "mySlides" });

		const numberText = newElement("div", mySlides, { class: "numbertext" }, +[item] + 1 + " / " + medias.length);
		if (medias[item].image != null) {
			const photographerMedias = newElement("img", mySlides, {
				class: "modal-img",
				src: "assets/img/" + photographer.name + "/" + medias[item].image,
				alt: medias[item].title,
			});
			const photographerMediasTitle = newElement("div", mySlides, { class: "caption-container" }, medias[item].title);
		} else if (medias[item].video != null) {
			let photographerMediasVideoContainer = newElement("video", mySlides, { class: "modal-img", width: "100%", height: "auto", controls: "true" });
			const photographerMediasVideo = newElement("source", photographerMediasVideoContainer, {
				src: "assets/img/" + photographer.name + "/" + medias[item].video,
				type: "video/mp4",
			});
			const photographerMediasVideoTitle = newElement("div", mySlides, { class: "caption-container" }, medias[item].title);
		}
	}
	const prev = newElement("a", modalContent, { class: "prev", onclick: "plusSlides(-1)" }, "<");
	const next = newElement("a", modalContent, { class: "next", onclick: "plusSlides(1)" }, ">");
};

// Open the Modal
function openModal() {
	document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
	document.getElementById("myModal").style.display = "none";
}
let slideIndex;
// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides((slideIndex = n));
}

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

export { renderLightbox, openModal, closeModal, plusSlides, currentSlide, showSlides };
