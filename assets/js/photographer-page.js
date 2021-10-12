import { renderAboutPhotograph } from "./render/renderAboutPhotograph.js";
import { renderMedias } from "./render/renderMedias.js";
import { renderLightbox, openModal, closeModal, plusSlides, currentSlide } from "./render/renderLightbox.js";
import { filter, checkTag } from "./functions/filters.js";
import { sort } from "./functions/sorting.js";
import { getData } from "./functions/getData.js";
import { createMedia } from "./factory/mediaFactory.js";

let mediasOfThisPhotograph = [];

const data = await getData();

let id = new URLSearchParams(window.location.search).get("id");
const medias = data.media.filter((objet) => objet.photographerId == id);
const photographer = data.photographers.find((objet) => objet.id == id);

for (let media of medias) {
	mediasOfThisPhotograph.push(createMedia(media));
}

renderAboutPhotograph();
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
sort("Popularité");

window.openModal = openModal;
window.closeModal = closeModal;
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;
window.sort = sort;
window.checkTag = checkTag;

export { mediasOfThisPhotograph, id, medias, photographer };
