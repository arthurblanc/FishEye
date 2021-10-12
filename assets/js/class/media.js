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

export { Media, Image, Video };
