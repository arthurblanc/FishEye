/* ↓ INDEX ↓ */
import { filter, checkTag } from "./functions/filters.js";
import { Photographer } from "./class/photographer.js";
import { renderPhotographersList } from "./render/renderPhotographersList.js";
import { getData } from "./functions/getData.js";

let photographers = [];

const data = await getData();

for (let photographer of data.photographers) {
	photographers.push(new Photographer(photographer));
}

filter(renderPhotographersList(), ".grid", ".itemSelector", "masonry");

window.checkTag = checkTag;

export { photographers };

/* ↑ INDEX ↑ */
