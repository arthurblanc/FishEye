import { mediasOfThisPhotograph } from "../photographer-page.js";
import { photographer } from "../photographer-page.js";

// Async function to render media gallery
const renderMedias = async () => {
	let allLikes = 0;
	for (let i = 0; i < mediasOfThisPhotograph.length; i++) {
		// Photographer total likes
		allLikes += mediasOfThisPhotograph[i].likes;
		const photographerLikes = newValue("about-photographer-likes-count", {}, allLikes);

		// Render gallery
		const photographerAllMediasContainer = $("#photographer-all-medias-container")[0];
		const photographerMediasContainer = newElement("article", photographerAllMediasContainer, {
			id: "media-container" + mediasOfThisPhotograph[i].id,
			class: "card border-0 px-md-5 mb-2 mb-md-4 bg-transparent photographer-medias-container itemSelector2",
		});
		photographerMediasContainer.classList.add(mediasOfThisPhotograph[i].tags[0]);

		// Add medias in gallery
		const photographerImgLink = newElement("a", photographerMediasContainer, {
			id: mediasOfThisPhotograph[i].id,
			"data-bs-toggle": "modal",
			"data-bs-target": "#myModal",
			class: "rounded photographer-img-link",
			href: "#",
		});
		const photographerImgContainer = newElement("figure", photographerImgLink, { class: "mb-0 photographer-img-container" });
		const photographerMediasTextContainer = newElement("figcaption", photographerMediasContainer, {
			id: "figcaption-" + mediasOfThisPhotograph[i].id,
			class: "d-flex mt-1 pb-2 position-relative photographer-medias-text-container",
		});
		if (mediasOfThisPhotograph[i].image != null) {
			const photographerMedias = newElement("img", photographerImgContainer, {
				class: "rounded photographer-medias-img",
				src: "assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].image,
				alt: mediasOfThisPhotograph[i].description,
				width: "550px",
				height: "520px",
			});
		} else if (mediasOfThisPhotograph[i].video != null) {
			let photographerMediasVideoContainer = newElement("video", photographerImgContainer, { class: "rounded photographer-medias-img", width: "100%", height: "100%", tabindex: "-1" });
			const photographerMediasVideo = newElement("source", photographerMediasVideoContainer, {
				src: "assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].video,
				alt: mediasOfThisPhotograph[i].description,
				type: "video/mp4",
			});
			$("#figcaption-" + mediasOfThisPhotograph[i].id).addClass("figcaption-video");
		}

		// Add likes button
		const photographerMediasTitle = newElement("div", photographerMediasTextContainer, { class: "col-10 photographer-medias-title" }, mediasOfThisPhotograph[i].title);
		const photographerMediasDate = newElement("div", photographerMediasTextContainer, { class: " photographer-medias-date hide" }, mediasOfThisPhotograph[i].date);
		const photographerMediasLikesContainer = newElement("button", photographerMediasTextContainer, {
			id: "likes-container-" + mediasOfThisPhotograph[i].id,
			type: "button",
			class: " d-flex p-0 position-absolute end-0 align-items-center btn photographer-medias-likes-container",
			tabindex: i + 2,
			"data-bs-toggle": "button",
			autocomplete: "off",
			onclick: "like(" + mediasOfThisPhotograph[i].id + ", " + 1 + ")",
		});
		const photographerMediasLikesCount = newElement(
			"div",
			photographerMediasLikesContainer,
			{ id: "like-" + mediasOfThisPhotograph[i].id, class: "me-1 photographer-medias-likes-count" },
			mediasOfThisPhotograph[i].likes.toString()
		);
		const photographerMediasLikesLogo = newElement("img", photographerMediasLikesContainer, {
			id: "like-heart-" + mediasOfThisPhotograph[i].id,
			src: "assets/img/likes.svg",
			alt: "likes",
			class: "photographer-medias-likes-logo",
		});
	}
};
export { renderMedias };
