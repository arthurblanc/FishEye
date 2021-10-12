const like = async (id, number) => {
	let mediaLikes = parseInt($("#like-" + id).text());
	mediaLikes = mediaLikes + number;
	$("#like-" + id).text(mediaLikes);

	let totalLikes = parseInt($("#about-photographer-likes-count").text());
	totalLikes = totalLikes + number;
	$("#about-photographer-likes-count").text(totalLikes);

	if (number === 1) {
		$("#likes-container-" + id).attr("onclick", "like(" + id + ", " + -1 + ")");
		$("#like-heart-" + id).addClass("is-liked");
	} else {
		$("#likes-container-" + id).attr("onclick", "like(" + id + ", " + 1 + ")");
		$("#like-heart-" + id).removeClass("is-liked");
	}
};
