/* ↓ INDEX ↓ */
/* Requête fetch pour récuperer la liste des articles et leurs détails */
const getData = async () => {
	const url = "./assets/json/FishEyeData.json";
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

class Photographer {
	constructor(data) {
		this.name = data.name;
		this.id = data.id;
		this.city = data.city;
		this.country = data.country;
		this.tags = data.tags;
		this.tagline = data.tagline;
		this.price = data.price;
		this.portrait = data.portrait;
	}
}

let photographers = [];

const photographerList = document.getElementById("photographer-list");

const renderPhotographersList = async () => {
	for (let i = 0; i < photographers.length; i++) {
		const photographerCard = newElement("article", photographerList, { class: "photographer-card" });

		const photographerCardPortraitContainer = newElement("div", photographerCard, { class: "photographer-card-portrait-container" });
		const photographerCardPortraitLink = newElement("a", photographerCardPortraitContainer, { class: "photographer-card-portrait-link", href: "./photographer-page.html?id=" + photographers[i].id });
		const photographerCardImg = newElement("img", photographerCardPortraitLink, {
			class: "photographer-card-img",
			src: "./assets/img/Photographers_ID_Photos/" + photographers[i].portrait,
			alt: photographers[i].name,
			width: "200px",
			height: "200px",
		});
		const photographerCardName = newElement("h2", photographerCardPortraitLink, { class: "photographer-card-name" }, photographers[i].name);

		const photographerCardTextContainer = newElement("div", photographerCard, { class: "photographer-card-text-container" });
		const photographerCardCity = newElement("p", photographerCardTextContainer, { class: "card-city" }, photographers[i].city + ", " + photographers[i].country);
		const photographerCardTagline = newElement("p", photographerCardTextContainer, { class: "card-tagline" }, photographers[i].tagline);
		const photographerCardPrice = newElement("p", photographerCardTextContainer, { class: "card-price" }, photographers[i].price + "€/jour");

		const photographerCardTagsContainer = newElement("ul", photographerCard, { class: "photographer-card-tags-container" });
		for (let item in photographers[i].tags) {
			const photographerCardTags = newElement("li", photographerCardTagsContainer, { class: "photographer-card-tags tag" }, "#" + photographers[i].tags[item]);
		}
	}
};

async function render() {
	var data = await getData();
	for (let photographer of data.photographers) {
		photographers.push(new Photographer(photographer));
	}
	renderPhotographersList();
}
render();
/* ↑ INDEX ↑ */
