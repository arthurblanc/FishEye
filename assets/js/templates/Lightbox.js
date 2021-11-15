// Define Lightbox class
class Lightbox {
	constructor(media, photographer) {
		this._media = media;
		this._photographer = photographer;
	}

	createLightbox() {
		const $wrapper = document.createElement("div");

		$wrapper.classList.add("mx-auto", "my-0", "mySlides");

		let lightboxDiv;
		if (this._media.image) {
			// Render HTML for image
			lightboxDiv = `
            <img class="rounded-top modal-img" src="assets/img/${this._photographer.name}/full-size/${this._media.image}" alt="${this._media.description}">
            `;
		} else if (this._media.video) {
			// Render HTML for video
			lightboxDiv = `
            <video class="rounded-top modal-img" controls="true" width="100%" height="auto">
                <source src="assets/img/${this._photographer.name}/${this._media.video}" alt="${this._media.description}" type="video/mp4">
            </video>
            `;
		}
		// Render lightbox
		const lightboxItem = `
        <div class="py-1 px-2 my-1 mx-2 rounded numbertext">
        <span id="lightbox-${this._media.id}"></span> / <span id="lightboxTotal-${this._media.id}"></span> </div>
            ${lightboxDiv} 
        <div class="rounded-bottom py-2 px-3 caption-container">${this._media.title}</div>
        `;

		$wrapper.innerHTML = lightboxItem;
		return $wrapper;
	}
}
export { Lightbox };
