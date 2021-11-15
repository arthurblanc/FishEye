import { newValue } from "../functions/newValue.js";
// Define AboutPhotographer class
class AboutPhotographer {
	constructor(photographer) {
		this._photographer = photographer;
	}

	createAboutPhotographer() {
		const pageTitle = $("#title")[0];
		pageTitle.textContent = this._photographer.name + " - FishEye";
		const callToActionModalPhotographerName = newValue("call-to-action-modal-photographer-name", this._photographer.name);
		// Render Tags loop for aboutPhotographer
		let photographerTags = "";
		for (let tag of this._photographer.tags) {
			const Tags = `
                <li>
                    <button role="button" type="button" class="btn btn-danger me-1 mb-1 p-1 rounded-pill photographer-card-tags tag btn-${tag}" data-bs-toggle="button" tabindex="1" autocomplete="off" onclick="checkTag('${tag}')" data-filter=".${tag}" aria-pressed="false">#${tag}</button>
                    <span class="visually-hidden">Tag ${tag}</span>
                </li>
            `;
			photographerTags = photographerTags + Tags;
		}
		// Render AboutPhotographer
		const $wrapper = document.createElement("div");
		$wrapper.classList.add("row");
		const aboutPhotographer = `
            <div class="col-8 col-lg-6">
                <h1 id="about-photographer-name">${this._photographer.name}</h1>
                <div>
                    <p id="about-photographer-city" class="py-1">${this._photographer.city}, ${this._photographer.country}</p>
                    <p id="about-photographer-tagline" class="pt-1 pb-3">${this._photographer.tagline}</p>
                </div>
                <div id="about-photographer-tags-container" class="filters">
                    <ul class="d-flex flex-wrap flex-lg-nowrap m-0 mx-auto list-unstyled about-photographer-tags-container">
                        ${photographerTags}
                    </ul>
                </div>
            </div>
            <div id="about-photographer-img-container" class="col-4 col-lg-6 d-md-flex flex-md-wrap justify-content-md-center justify-content-lg-between">
                <!-- Button trigger modal -->
                <button id="call-to-action-button" type="button" tabindex="1" class="mt-md-3 mx-auto m-lg-0 px-4 py-2 p-md-2 py-lg-3 order-md-2 rounded border-0 btn btn-danger" data-bs-toggle="modal" data-bs-target="#formModal" aria-label="Contact Me">
                    Contactez-moi
                </button>
                <img id="about-photographer-img" src="assets/img/Photographers_ID_Photos/${this._photographer.portrait}" alt="${this._photographer.name}" class="rounded-circle order-md-1 order-lg-2" width="200px" height="200px">
            </div>
            <div id="about-photographer-likes-price-container" class="d-none d-md-flex fixed-bottom rounded-top px-md-4 py-md-3">
                <div id="about-photographer-likes-container" class="me-5 d-flex align-items-center">
                    <div id="about-photographer-likes-count" class="me-1"></div>
                    <img src="./assets/img/likes.svg" alt="" aria-hidden="true" id="about-photographer-likes-logo">
                </div>
                <p id="about-photographer-price">${this._photographer.price} / jour</p>
            </div>
        `;

		$wrapper.innerHTML = aboutPhotographer;
		return $wrapper;
	}
}
export { AboutPhotographer };
