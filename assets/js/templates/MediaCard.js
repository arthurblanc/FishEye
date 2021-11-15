// Define MediaCard class
class MediaCard {
	constructor(media, photographer) {
		this._media = media;
		this._photographer = photographer;
	}

	createMediaCard() {
		const $wrapper = document.createElement("div");

		$wrapper.classList.add("card", "border-0", "px-md-5", "mb-2", "mb-md-4", "bg-transparent", "photographer-medias-container", "itemSelector");
		$wrapper.classList.add(`${this._media.tags}`);

		let mediaDiv;
		if (this._media.image) {
			// Render HTML for image
			mediaDiv = `
            <img class="rounded photographer-medias-img" src="assets/img/${this._photographer.name}/${this._media.image}" alt="${this._media.description}" width="550px" height="520px">
            `;
		} else if (this._media.video) {
			// Render HTML for video
			mediaDiv = `
            <video class="rounded photographer-medias-img" tabindex="-1" width="100%" height="100%" aria-label="${this._media.description}">
                <source src="assets/img/${this._photographer.name}/${this._media.video}"  type="video/mp4">
            </video>
            `;
		}
		// Render media card
		const mediaCard = `
            <a id="media-${this._media.id}" data-bs-toggle="modal" data-bs-target="#lightboxModal" class="rounded photographer-img-link" aria-label="${this._media.title}, closeup view" href="#">
                <figure class="mb-0 photographer-img-container">
                    ${mediaDiv}  
                </figure>
            </a>
            <figcaption class="d-flex mt-1 pb-2 position-relative photographer-medias-text-container">
                <div class="col-9 photographer-medias-title">${this._media.title}</div>
                <div class=" photographer-medias-date hide">${this._media.date}</div>
                <button id="likes-container-${this._media.id}" type="button" class=" d-flex p-0 position-absolute end-0 align-items-center btn photographer-medias-likes-container" data-bs-toggle="button" onclick="like(${this._media.id}, 1)">
                    <div id="like-${this._media.id}" class="me-1 photographer-medias-likes-count">${this._media.likes}</div>
                    <img id="like-heart-${this._media.id}" src="assets/img/likes.svg" alt="likes" class="photographer-medias-likes-logo">
                </button>
            </figcaption>
        `;

		$wrapper.innerHTML = mediaCard;
		return $wrapper;
	}
}
export { MediaCard };
