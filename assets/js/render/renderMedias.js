import { mediasOfThisPhotograph } from "../photographer-page.js";
import { photographer } from "../photographer-page.js";

const renderMedias = async () => {
	let allLikes = 0;
	for (let i = 0; i < mediasOfThisPhotograph.length; i++) {
		// Photographer total likes
		allLikes += mediasOfThisPhotograph[i].likes;
		// Render galery
		const photographerAllMediasContainer = document.getElementById("photographer-all-medias-container");
		const photographerMediasContainer = newElement("div", photographerAllMediasContainer, { id: "media-container" + mediasOfThisPhotograph[i].id, class: "photographer-medias-container itemSelector2" });
		photographerMediasContainer.classList.add(mediasOfThisPhotograph[i].tags[0]);
		const photographerImgContainer = newElement("div", photographerMediasContainer, { class: "photographer-img-container" });

		if (mediasOfThisPhotograph[i].image != null) {
			const photographerMedias = newElement("img", photographerImgContainer, {
				id: mediasOfThisPhotograph[i].id,
				class: "photographer-medias-img",
				src: "assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].image,
				alt: mediasOfThisPhotograph[i].title,
				width: "550px",
				height: "520px",
			});
		} else if (mediasOfThisPhotograph[i].video != null) {
			let photographerMediasVideoContainer = newElement("video", photographerImgContainer, { id: mediasOfThisPhotograph[i].id, class: "photographer-medias-img", width: "100%", height: "auto" });
			const photographerMediasVideo = newElement("source", photographerMediasVideoContainer, {
				src: "assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].video,
				type: "video/mp4",
			});
		}

		const photographerMediasTextContainer = newElement("div", photographerMediasContainer, { class: "photographer-medias-text-container" });
		const photographerMediasTitle = newElement("div", photographerMediasTextContainer, { class: "photographer-medias-title" }, mediasOfThisPhotograph[i].title);
		const photographerMediasDate = newElement("div", photographerMediasTextContainer, { class: "photographer-medias-date hide" }, mediasOfThisPhotograph[i].date);
		const photographerMediasLikesContainer = newElement("div", photographerMediasTextContainer, {
			id: "likes-container-" + mediasOfThisPhotograph[i].id,
			class: "photographer-medias-likes-container",
			onclick: "like(" + mediasOfThisPhotograph[i].id + ", " + 1 + ")",
		});
		const photographerMediasLikesCount = newElement(
			"div",
			photographerMediasLikesContainer,
			{ id: "like-" + mediasOfThisPhotograph[i].id, class: "photographer-medias-likes-count" },
			mediasOfThisPhotograph[i].likes.toString()
		);
		const photographerMediasLikesLogo = newElement("img", photographerMediasLikesContainer, {
			id: "like-heart-" + mediasOfThisPhotograph[i].id,
			src: "assets/img/likes.svg",
			alt: "likes",
			class: "photographer-medias-likes-logo",
		});
	}
	const photographerLikes = newValue("about-photographer-likes-count", {}, allLikes);
};
export { renderMedias };
