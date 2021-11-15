// Define PhotographerCard class
class PhotographerCard {
	constructor(photographer) {
		this._photographer = photographer;
	}

	createPhotographerCard() {
		const $wrapper = document.createElement("div");
		$wrapper.classList.add("col", "text-center", "mb-5", "itemSelector");
		for (let tag of this._photographer._tags) {
			$wrapper.classList.add(tag);
		}
		$wrapper.setAttribute("id", `${this._photographer._id}`);
		// Render Tags loop for photographer card
		let cardTags = "";
		for (let tag of this._photographer._tags) {
			const Tags = `
                <li>
                    <button role="button" type="button" class="btn btn-danger me-1 mb-1 p-1 rounded-pill photographer-card-tags tag btn-${tag}" data-bs-toggle="button" autocomplete="off" onclick="checkTag('${tag}')" data-filter=".${tag}" aria-pressed="false">#${tag}</button>
                    <span class="visually-hidden">Tag ${tag}</span>
                </li>
            `;
			cardTags = cardTags + Tags;
		}
		// Render photographer card
		const photographerCard = `
            <article class="card h-100 border-0 bg-transparent photographer-card">
                <a class="photographer-card-portrait-link" href="photographer-page.html?id=${this._photographer._id}" aria-label="${this._photographer._name}">
                    <div class="photographer-card-portrait-container">
                        <figure>
                            <img class="rounded-circle photographer-card-img" src="assets/img/Photographers_ID_Photos/${this._photographer._portrait}" alt="" width="200px" height="200px">
                        </figure>
                        <figurecaption>
                            <h2 class="photographer-card-name">${this._photographer._name}</h2>
                        </figurecaption>
                    </div>
                </a>
                <div class="card-body photographer-card-text-container">
                    <p class="card-city">${this._photographer._city}, ${this._photographer._country}</p>
                    <p class="card-tagline">${this._photographer._tagline}</p>
                    <p class="card-price">${this._photographer._price}€/jour</p>
                </div>
                <ul id="tags-${this._photographer._id}" class="d-flex justify-content-center flex-wrap flex-lg-nowrap m-0 mx-auto list-unstyled photographer-card-tags-container filters" aria-label="Tags of ${this._photographer._name}">
                ${cardTags}
                </ul>
            </article>
        `;

		$wrapper.innerHTML = photographerCard;
		return $wrapper;
	}
}
export { PhotographerCard };
