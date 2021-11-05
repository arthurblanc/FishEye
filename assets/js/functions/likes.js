// Async function for likes management
const like = async (id, number) => {
	// Get picture likes count
	let mediaLikes = parseInt($("#like-" + id).text());
	// Add or remove like to the count
	mediaLikes = mediaLikes + number;
	$("#like-" + id).text(mediaLikes);

	// Get total photographer likes count
	let totalLikes = parseInt($("#about-photographer-likes-count").text());
	// Add or remove like to the total count
	totalLikes = totalLikes + number;
	$("#about-photographer-likes-count").text(totalLikes);

	if (number === 1) {
		// Change function to dislike when like button is pressed
		$("#likes-container-" + id).attr("onclick", "like(" + id + ", " + -1 + ")");
		// Add is-liked class when like button is pressed
		$("#like-heart-" + id).addClass("is-liked");
	} else {
		// Change function to like when dislike button is pressed
		$("#likes-container-" + id).attr("onclick", "like(" + id + ", " + 1 + ")");
		// Remove is-liked class when dislike button is pressed
		$("#like-heart-" + id).removeClass("is-liked");
	}
};
