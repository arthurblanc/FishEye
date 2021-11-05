import { photographers } from "../index.js";

const photographerList = $("#photographer-list")[0];

// Async function to render photographer list
const renderPhotographersList = async () => {
	// Render photographer card
	for (let i = 0; i < photographers.length; i++) {
		// Add figure card
		const photographerCol = newElement("div", photographerList, { id: photographers[i].id, class: "col text-center mb-5 itemSelector" });
		const photographerCard = newElement("article", photographerCol, { class: "card h-100 border-0 bg-transparent photographer-card" });
		const photographerCardLink = newElement("a", photographerCard, { class: "photographer-card-portrait-link", href: "photographer-page.html?id=" + photographers[i].id, "aria-label": photographers[i].name });
		const photographerCardPortraitContainer = newElement("div", photographerCardLink, { class: "photographer-card-portrait-container" });
		const photographerCardPortraitFigure = newElement("figure", photographerCardPortraitContainer);
		const photographerCardImg = newElement("img", photographerCardPortraitFigure, {
			class: "rounded-circle photographer-card-img",
			src: "assets/img/Photographers_ID_Photos/" + photographers[i].portrait,
			alt: "",
			width: "200px",
			height: "200px",
		});
		const photographerCardPortraitFigureCaption = newElement("figurecaption", photographerCardPortraitContainer);
		const photographerCardName = newElement("h2", photographerCardPortraitFigureCaption, { class: "photographer-card-name" }, photographers[i].name);

		// Add text card
		const photographerCardTextContainer = newElement("div", photographerCard, { class: "card-body photographer-card-text-container" });
		const photographerCardCity = newElement("p", photographerCardTextContainer, { class: "card-city" }, photographers[i].city + ", " + photographers[i].country);
		const photographerCardTagline = newElement("p", photographerCardTextContainer, { class: "card-tagline" }, photographers[i].tagline);
		const photographerCardPrice = newElement("p", photographerCardTextContainer, { class: "card-price" }, photographers[i].price + "€/jour");

		// add tags buttons
		const photographerCardTagsContainer = newElement("ul", photographerCard, {
			class: "d-flex justify-content-center flex-wrap flex-lg-nowrap m-0 mx-auto list-unstyled photographer-card-tags-container filters",
			"aria-label": "Tags of " + photographers[i].name,
		});
		for (let item in photographers[i].tags) {
			photographerCol.classList.add(photographers[i].tags[item]);
			const photographerCardLi = newElement("li", photographerCardTagsContainer);
			const photographerCardTags = newElement(
				"button",
				photographerCardLi,
				{
					role: "button",
					type: "button",
					class: "btn btn-danger me-1 mb-1 p-1 rounded-pill photographer-card-tags tag btn-" + photographers[i].tags[item],
					"data-bs-toggle": "button",
					autocomplete: "off",
					onclick: "checkTag('" + photographers[i].tags[item] + "')",
					"data-filter": "." + photographers[i].tags[item],
					"aria-pressed": "false",
				},
				"#" + photographers[i].tags[item]
			);
			const photographerCardTagsSR = newElement("span", photographerCardLi, { class: "visually-hidden" }, "Tag " + photographers[i].tags[item]);
		}
	}
};
export { renderPhotographersList };
