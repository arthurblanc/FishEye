import { filter, checkTag } from "./functions/filters.js";
import { Photographer } from "./class/photographer.js";
import { renderPhotographersList } from "./render/renderPhotographersList.js";
import { getData } from "./functions/getData.js";

// Create photographers array
let photographers = [];

// Get data
const data = await getData();

// Push data in photographers array
for (let photographer of data.photographers) {
	photographers.push(new Photographer(photographer));
}

// Init filter and render photographers list
filter(renderPhotographersList(), ".grid", ".itemSelector", "masonry");

// Extend function to navigation window
window.checkTag = checkTag;

export { photographers };
