import { Image, Video } from "../class/media.js";

const createMedia = (data) => {
	if (data.image) {
		return new Image(data);
	} else if (data.video) {
		return new Video(data);
	}
};

export { createMedia };
