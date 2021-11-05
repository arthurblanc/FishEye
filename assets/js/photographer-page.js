import { renderAboutPhotograph } from "./render/renderAboutPhotograph.js";
import { renderMedias } from "./render/renderMedias.js";
import { renderLightbox, plusSlides, currentSlide } from "./render/renderLightbox.js";
import { filter, checkTag } from "./functions/filters.js";
import { sort } from "./functions/sorting.js";
import { getData } from "./functions/getData.js";
import { createMedia } from "./factory/mediaFactory.js";

// Create mediasOfThisPhotograph array
let mediasOfThisPhotograph = [];

// Get data
const data = await getData();

// Get photographer id
let id = new URLSearchParams(window.location.search).get("id");
// Filter medias with photographer id
const medias = data.media.filter((objet) => objet.photographerId == id);
// Filter photographer with photographer id
const photographer = data.photographers.find((objet) => objet.id == id);

// Push data in mediasOfThisPhotograph array
for (let media of medias) {
	mediasOfThisPhotograph.push(createMedia(media));
}

// Render About Photograph section
renderAboutPhotograph();
// Init filter and render medias
filter(
	renderMedias(),
	".grid",
	".itemSelector2",
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
sort("Popularité");

// Extend function to navigation window
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;
window.sort = sort;
window.checkTag = checkTag;

export { mediasOfThisPhotograph, id, medias, photographer };
