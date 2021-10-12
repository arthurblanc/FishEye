import { photographer } from "../photographer-page.js";

const renderAboutPhotograph = async () => {
	const pageTitle = document.getElementById("title");
	pageTitle.textContent = photographer.name + " - FishEye";
	const photographerImg = newValue("about-photographer-img", { src: "assets/img/Photographers_ID_Photos/" + photographer.portrait, alt: photographer.name, width: "200px", height: "200px" });
	const photographerCity = newValue("about-photographer-city", {}, photographer.city + ", " + photographer.country);
	const photographerName = newValue("about-photographer-name", {}, photographer.name);

	const photographerTagline = newValue("about-photographer-tagline", {}, photographer.tagline);
	const photographerTagsContainer = document.getElementById("about-photographer-tags-container");
	const photographerTagsContainerList = newElement("ul", photographerTagsContainer, { class: "about-photographer-tags-container" });
	for (let item in photographer.tags) {
		const photographerTags = newElement(
			"li",
			photographerTagsContainerList,
			{ class: "about-photographer-tags tag btn" + " btn-" + photographer.tags[item], onclick: "checkTag('" + photographer.tags[item] + "')", datafilter: "." + photographer.tags[item] },
			"#" + photographer.tags[item]
		);
	}
	const callToActionModalPhotographerName = newValue("call-to-action-modal-photographer-name", {}, photographer.name);
	const photographerPrice = newValue("about-photographer-price", {}, photographer.price + "€ / jour");
};

export { renderAboutPhotograph };
