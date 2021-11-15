import { plusSlides, currentSlide } from "./functions/slider.js";
import { filter, filters, checkTag } from "./functions/filters.js";
import { newValue } from "./functions/newValue.js";
import { sort } from "./functions/sorting.js";
import { PhotographersApi, MediasApi } from "./api/api.js";
import { MediasFactory } from "./factories/MediasFactory.js";
import { Photographer } from "./class/photographer.js";
import { Lightbox } from "./templates/Lightbox.js";
import { AboutPhotographer } from "./templates/AboutPhotographer.js";
import { MediaCard } from "./templates/MediaCard.js";

// Create mediasLightbox array
let mediasLightbox = [];

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");

// Define Photographer Pages class
class PhotographerPages {
	constructor() {
		// Get elements
		this.$aboutPhotographerWrapper = document.querySelector("#about-photographer");
		this.$mediasWrapper = document.querySelector("#photographer-all-medias-container");
		this.$lightboxWrapper = document.querySelector("#modal-content");
		// Get data
		this.photographersApi = new PhotographersApi("./assets/json/FishEyeData.json");
		this.mediasApi = new MediasApi("./assets/json/FishEyeData.json");
		// Data filters functions
		this.photographer = async () => {
			const photographerData = await this.photographersApi.getPhotographers();
			photographerData.map((photographer) => new Photographer(photographer));
			const photographerDataFiltered = photographerData.find((photographer) => photographer.id == id);
			return photographerDataFiltered;
		};
		this.media = async () => {
			const mediasData = await this.mediasApi.getMedias();
			mediasData.map((media) => new MediasFactory(media));
			const mediasDataFiltered = mediasData.filter((photographer) => photographer.photographerId == id);
			return mediasDataFiltered;
		};
	}
	// Render aboutPhotographer
	async aboutPhotographer() {
		const photographer = await this.photographer();
		const template = new AboutPhotographer(photographer);
		this.$aboutPhotographerWrapper.appendChild(template.createAboutPhotographer());
	}
	// Render medias
	async medias() {
		let allLikes = 0;

		const photographer = await this.photographer();
		const mediasData = await this.media();

		mediasData.forEach((media) => {
			const template = new MediaCard(media, photographer);
			this.$mediasWrapper.appendChild(template.createMediaCard());
			allLikes += media.likes;
		});
		newValue("about-photographer-likes-count", allLikes);
	}
	// Fill mediasLightbox array (for lightbox)
	async mediasLightboxArray() {
		const mediasData = await this.media();
		mediasLightbox = mediasData.filter((photographer) => photographer.photographerId == id);
	}

	async lightbox() {
		const photographer = await this.photographer();
		// Remove old slides
		const mySlides = document.getElementsByClassName("mySlides");
		while (mySlides.length > 0) {
			mySlides[0].parentNode.removeChild(mySlides[0]);
		}
		// Lightbox medias filter
		if (filters.length != 0) {
			let dataFilter = "(";
			for (let i = 0; i < filters.length; i++) {
				let newData = "objet.tags == '" + filters[i].substring(1) + "'";
				if (i > 0) {
					dataFilter = dataFilter + " || " + newData;
				}
				if (i === 0) {
					dataFilter = dataFilter + newData;
				}
			}
			dataFilter = dataFilter + ")";
			var medias = mediasLightbox.filter((objet) => objet.photographerId == id && eval(dataFilter));
		} else {
			var medias = mediasLightbox.filter((objet) => objet.photographerId == id);
		}
		// Render lightbox
		let mediaItem = 1;
		medias.forEach((media) => {
			const mediaId = media.id;
			const template = new Lightbox(media, photographer);
			const carouselControlPrev = document.getElementById("carousel-control-prev");
			this.$lightboxWrapper.insertBefore(template.createLightbox(), carouselControlPrev);
			// Add MediaNumber / TotalMedia in lightbox
			newValue("lightboxTotal-" + mediaId, medias.length);
			newValue("lightbox-" + mediaId, mediaItem);
			// Add onClick on medias for slider
			const imgOnClick = document.getElementById("media-" + mediaId);
			imgOnClick.setAttribute("onclick", "currentSlide(" + mediaItem++ + ")");
		});
	}
}
// initApp function
const initApp = async () => {
	const photographerPages = new PhotographerPages();
	await photographerPages.aboutPhotographer();

	await photographerPages.mediasLightboxArray();

	// Init filter and render medias
	await filter(
		photographerPages.medias(),
		".grid",
		".itemSelector",
		"fitRows",
		"popularity",
		{
			popularity: ".photographer-medias-likes-count parseInt",
			date: ".photographer-medias-date",
			title: ".photographer-medias-title",
		},
		{
			popularity: false,
			date: false,
			title: true,
		}
	);
	// Default popularity sort
	await sort("Popularité");
};
initApp();

// Extend function to navigation window
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;
window.sort = sort;
window.checkTag = checkTag;

export { mediasLightbox, PhotographerPages };
