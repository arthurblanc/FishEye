import { photographer } from "../photographer-page.js";

// Async function to render About Photograph section
const renderAboutPhotograph = async () => {
	// Render photographer data
	const pageTitle = $("#title")[0];
	pageTitle.textContent = photographer.name + " - FishEye";
	const photographerImg = newValue("about-photographer-img", {
		src: "assets/img/Photographers_ID_Photos/" + photographer.portrait,
		class: "rounded-circle order-md-1 order-lg-2",
		alt: photographer.name,
		width: "200px",
		height: "200px",
	});
	const photographerCity = newValue("about-photographer-city", {}, photographer.city + ", " + photographer.country);
	const photographerName = newValue("about-photographer-name", {}, photographer.name);
	const photographerTagline = newValue("about-photographer-tagline", {}, photographer.tagline);
	const callToActionModalPhotographerName = newValue("call-to-action-modal-photographer-name", {}, photographer.name);
	const photographerPrice = newValue("about-photographer-price", {}, photographer.price + "€ / jour");

	// Add photographer tags
	const photographerTagsContainer = $("#about-photographer-tags-container")[0];
	const photographerTagsContainerList = newElement("ul", photographerTagsContainer, { class: "d-flex flex-wrap flex-lg-nowrap m-0 mx-auto list-unstyled about-photographer-tags-container" });
	for (let item in photographer.tags) {
		const photographerCardLi = newElement("li", photographerTagsContainerList);
		const photographerTags = newElement(
			"button",
			photographerCardLi,
			{
				role: "button",
				type: "button",
				class: "btn btn-danger me-1 mb-1 p-1 rounded-pill about-photographer-tags tag btn-" + photographer.tags[item],
				"data-bs-toggle": "button",
				tabindex: "1",
				autocomplete: "off",
				onclick: "checkTag('" + photographer.tags[item] + "')",
				"data-filter": "." + photographer.tags[item],
				"aria-pressed": "false",
			},
			"#" + photographer.tags[item]
		);
		const photographerTagsSR = newElement("span", photographerCardLi, { class: "visually-hidden" }, "Tag " + photographer.tags[item]);
	}
};

export { renderAboutPhotograph };
