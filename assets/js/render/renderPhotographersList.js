import { photographers } from "../index.js";

const photographerList = document.getElementById("photographer-list");

const renderPhotographersList = async () => {
	for (let i = 0; i < photographers.length; i++) {
		const photographerCard = newElement("article", photographerList, { id: photographers[i].id, class: "photographer-card itemSelector" });

		const photographerCardPortraitContainer = newElement("div", photographerCard, { class: "photographer-card-portrait-container" });
		const photographerCardPortraitLink = newElement("a", photographerCardPortraitContainer, { class: "photographer-card-portrait-link", href: "photographer-page.html?id=" + photographers[i].id });
		const photographerCardImg = newElement("img", photographerCardPortraitLink, {
			class: "photographer-card-img",
			src: "assets/img/Photographers_ID_Photos/" + photographers[i].portrait,
			alt: photographers[i].name,
			width: "200px",
			height: "200px",
		});
		const photographerCardName = newElement("h2", photographerCardPortraitLink, { class: "photographer-card-name" }, photographers[i].name);

		const photographerCardTextContainer = newElement("div", photographerCard, { class: "photographer-card-text-container" });
		const photographerCardCity = newElement("p", photographerCardTextContainer, { class: "card-city" }, photographers[i].city + ", " + photographers[i].country);
		const photographerCardTagline = newElement("p", photographerCardTextContainer, { class: "card-tagline" }, photographers[i].tagline);
		const photographerCardPrice = newElement("p", photographerCardTextContainer, { class: "card-price" }, photographers[i].price + "€/jour");

		const photographerCardTagsContainer = newElement("ul", photographerCard, { class: "photographer-card-tags-container filters" });
		for (let item in photographers[i].tags) {
			photographerCard.classList.add(photographers[i].tags[item]);
			const photographerCardTags = newElement(
				"li",
				photographerCardTagsContainer,
				{ class: "photographer-card-tags tag btn btn-" + photographers[i].tags[item], onclick: "checkTag('" + photographers[i].tags[item] + "')", datafilter: "." + photographers[i].tags[item] },
				"#" + photographers[i].tags[item]
			);
		}
	}
};
export { renderPhotographersList };
