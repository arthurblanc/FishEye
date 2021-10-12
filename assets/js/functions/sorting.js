import { mediasOfThisPhotograph } from "../photographer-page.js";
import { renderLightbox } from "../render/renderLightbox.js";

const removeHide = (classname) => {
	const elements = document.querySelectorAll(classname);
	elements.forEach((el) => el.classList.remove("hide"));
};

const modifyDropdownTitle = (newTitle) => {
	const dropdownTitle = document.querySelectorAll("#dropdown-title");
	dropdownTitle[0].textContent = newTitle;
};

const sort = async (type) => {
	removeHide(".sort-button");
	if (type === "Date") {
		mediasOfThisPhotograph.sort((a, b) => b.date.localeCompare(a.date));
		const sortBtn = document.getElementById("sort-by-date");
		sortBtn.classList.add("hide");
	}
	if (type === "Titre") {
		mediasOfThisPhotograph.sort((a, b) => a.title.localeCompare(b.title));
		const sortBtn = document.getElementById("sort-by-name");
		sortBtn.classList.add("hide");
	}
	if (type === "Popularité") {
		mediasOfThisPhotograph.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
		const sortBtn = document.getElementById("sort-by-popularity");
		sortBtn.classList.add("hide");
	}
	modifyDropdownTitle(type);
	renderLightbox();
};

export { sort };
