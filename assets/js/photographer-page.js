/* ↓ INDEX ↓ */
/* Requête fetch pour récuperer la liste des articles et leurs détails */
const getData = async () => {
	const url = "./assets/json/FishEyeData.json";
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

class Media {
	constructor(data) {
		this.id = data.id;
		this.photographerId = data.photographerId;
		this.title = data.title;
		this.tags = data.tags;
		this.likes = data.likes;
		this.date = data.date;
		this.price = data.price;
	}
}

class Image extends Media {
	constructor(data) {
		super(data);
		this.image = data.image;
	}
}

class Video extends Media {
	constructor(data) {
		super(data);
		this.video = data.video;
	}
}

const createMedia = (data) => {
	if (data.image) {
		return new Image(data);
	} else if (data.video) {
		return new Video(data);
	}
};

let mediasOfThisPhotograph = [];

let id = new URLSearchParams(window.location.search).get("id");

async function render() {
	var data = await getData();

	const medias = data.media.filter((objet) => objet.photographerId == id);
	const photographer = data.photographers.find((objet) => objet.id == id);

	for (let media of medias) {
		mediasOfThisPhotograph.push(createMedia(media));
	}
	const pageTitle = document.getElementById("title");
	pageTitle.textContent = photographer.name + " - FishEye";
	const photographerImg = newValue("about-photographer-img", { src: "./assets/img/Photographers_ID_Photos/" + photographer.portrait, alt: photographer.name, width: "200px", height: "200px" });
	const photographerCity = newValue("about-photographer-city", {}, photographer.city + ", " + photographer.country);
	const photographerName = newValue("about-photographer-name", {}, photographer.name);

	const photographerTagline = newValue("about-photographer-tagline", {}, photographer.tagline);
	const photographerTagsContainer = document.getElementById("about-photographer-tags-container");
	const photographerTagsContainerList = newElement("ul", photographerTagsContainer, { class: "about-photographer-tags-container" });
	for (let item in photographer.tags) {
		const photographerTags = newElement("li", photographerTagsContainerList, { class: "about-photographer-tags tag " }, "#" + photographer.tags[item]);
	}
	const photographerPrice = newValue("about-photographer-price", {}, photographer.price + "€ / jour");
	let allLikes = 0;
	for (let i = 0; i < mediasOfThisPhotograph.length; i++) {
		// Photographer total likes
		allLikes += mediasOfThisPhotograph[i].likes;
		// Render galery
		const photographerAllMediasContainer = document.getElementById("photographer-all-medias-container");
		const photographerMediasContainer = newElement("div", photographerAllMediasContainer, { class: "photographer-medias-container " });
		const photographerImgContainer = newElement("div", photographerMediasContainer, { class: "photographer-img-container" });

		if (mediasOfThisPhotograph[i].image != null) {
			const photographerMedias = newElement("img", photographerImgContainer, {
				class: "photographer-medias-img",
				src: "./assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].image,
				alt: mediasOfThisPhotograph[i].title,
				width: "550px",
				height: "520px",
			});
		} else if (mediasOfThisPhotograph[i].video != null) {
			let photographerMediasVideoContainer = newElement("video", photographerImgContainer, {
				src: "./assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].video,
				type: "video/mp4",
				width: "100%",
				height: "auto",
			});
		}

		const photographerMediasTextContainer = newElement("div", photographerMediasContainer, { class: "photographer-medias-text-container" });
		const photographerMediasTitle = newElement("div", photographerMediasTextContainer, { class: "photographer-medias-title" }, mediasOfThisPhotograph[i].title);
		const photographerMediasLikesContainer = newElement("div", photographerMediasTextContainer, {
			class: "photographer-medias-likes-container",
		});
		const photographerMediasLikesCount = newElement("div", photographerMediasLikesContainer, { class: "photographer-medias-likes-count" }, mediasOfThisPhotograph[i].likes.toString());
		const photographerMediasLikesLogo = newElement("img", photographerMediasLikesContainer, { src: "./assets/img/likes.svg", alt: "likes", class: "photographer-medias-likes-logo" });
	}
	const photographerLikes = newValue("about-photographer-likes-count", {}, allLikes);
}
render();
/* ↑ INDEX ↑ */
