// Define Api class
class Api {
	/**
	 *
	 * @param {string} url
	 */
	constructor(url) {
		this._url = url;
	}

	async get(data) {
		return fetch(this._url)
			.then((res) => res.json())
			.then((res) => eval(data))
			.catch((err) => console.log("an error occurs", err));
	}
}
// Define PhotographersApi class with Api
class PhotographersApi extends Api {
	/**
	 *
	 * @param {string} url
	 */
	constructor(url) {
		super(url);
	}
	// Get Photographers data
	async getPhotographers() {
		return await this.get("res.photographers");
	}
}
// Define MediasApi class with Api
class MediasApi extends Api {
	/**
	 *
	 * @param {string} url
	 */
	constructor(url) {
		super(url);
	}
	// Get Medias data
	async getMedias() {
		return await this.get("res.media");
	}
}

export { PhotographersApi, MediasApi };
