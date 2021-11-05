import { mediasOfThisPhotograph } from "../photographer-page.js";
import { renderLightbox } from "../render/renderLightbox.js";

// Function to remove hide class on elements
const removeHide = (classname) => {
	const elements = document.querySelectorAll(classname);
	elements.forEach((el) => el.classList.remove("hide"));
};

// Function to modify dropdown title menu
const modifyDropdownTitle = (newTitle) => {
	const dropdownTitle = document.querySelectorAll("#dropdown-title");
	dropdownTitle[0].textContent = newTitle;
};

// Async function to add tabindex on a element
const addTabIndex = async (id, index) => {
	const element = document.getElementById(id);
	element.setAttribute("tabindex", index);
};

// Async function to update tabindex
const sortingTabIndexForMediasAndLikes = async () => {
	for (let i = 0; i < mediasOfThisPhotograph.length; i++) {
		addTabIndex(mediasOfThisPhotograph[i].id, parseFloat(mediasOfThisPhotograph.indexOf(mediasOfThisPhotograph[i]) + 2));
		addTabIndex("likes-container-" + mediasOfThisPhotograph[i].id, parseFloat(mediasOfThisPhotograph.indexOf(mediasOfThisPhotograph[i]) + 2));
	}
};

// Async function for sorting medias
const sort = async (type) => {
	removeHide(".sort-button");
	// Sort medias by date
	if (type === "Date") {
		mediasOfThisPhotograph.sort((a, b) => b.date.localeCompare(a.date));
		const sortBtn = $("#sort-by-date")[0];
		sortBtn.classList.add("hide");
	}
	// Sort medias by title
	if (type === "Titre") {
		mediasOfThisPhotograph.sort((a, b) => a.title.localeCompare(b.title));
		const sortBtn = $("#sort-by-name")[0];
		sortBtn.classList.add("hide");
	}
	// Sort medias by likes count
	if (type === "Popularité") {
		mediasOfThisPhotograph.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
		const sortBtn = $("#sort-by-popularity")[0];
		sortBtn.classList.add("hide");
	}
	// Update tabindex when sorting
	sortingTabIndexForMediasAndLikes();
	// Modify dropdonw title when sorting
	modifyDropdownTitle(type);
	// Rerender lightbox when sorting
	renderLightbox();
};

export { sort };
