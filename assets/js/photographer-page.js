/* ↓ INDEX ↓ */
/* Requête fetch pour récuperer la liste des articles et leurs détails */
const getData = async () => {
	const url = "./assets/json/FishEyeData.json";
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

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

const createMedia = (data) => {
	if (data.image) {
		return new Image(data);
	} else if (data.video) {
		return new Video(data);
	}
};

let mediasOfThisPhotograph = [];

let id = new URLSearchParams(window.location.search).get("id");

const renderMedias = async () => {
	var data = await getData();
	const photographer = data.photographers.find((objet) => objet.id == id);

	let allLikes = 0;
	for (let i = 0; i < mediasOfThisPhotograph.length; i++) {
		// Photographer total likes
		allLikes += mediasOfThisPhotograph[i].likes;
		// Render galery
		const photographerAllMediasContainer = document.getElementById("photographer-all-medias-container");
		const photographerMediasContainer = newElement("div", photographerAllMediasContainer, { class: "photographer-medias-container itemSelector2" });
		photographerMediasContainer.classList.add(mediasOfThisPhotograph[i].tags[0]);
		const photographerImgContainer = newElement("div", photographerMediasContainer, { class: "photographer-img-container" });

		if (mediasOfThisPhotograph[i].image != null) {
			const photographerMedias = newElement("img", photographerImgContainer, {
				id: mediasOfThisPhotograph[i].id,
				class: "photographer-medias-img",
				src: "./assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].image,
				alt: mediasOfThisPhotograph[i].title,
				width: "550px",
				height: "520px",
			});
		} else if (mediasOfThisPhotograph[i].video != null) {
			let photographerMediasVideoContainer = newElement("video", photographerImgContainer, {
				id: mediasOfThisPhotograph[i].id,
				src: "./assets/img/" + photographer.name + "/" + mediasOfThisPhotograph[i].video,
				type: "video/mp4",
				width: "100%",
				height: "auto",
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
		const photographerMediasLikesLogo = newElement("img", photographerMediasLikesContainer, { src: "./assets/img/likes.svg", alt: "likes", class: "photographer-medias-likes-logo" });
	}
	const photographerLikes = newValue("about-photographer-likes-count", {}, allLikes);
};

async function render() {
	var data = await getData();

	var medias = data.media.filter((objet) => objet.photographerId == id);
	const photographer = data.photographers.find((objet) => objet.id == id);

	for (let media of medias) {
		mediasOfThisPhotograph.push(createMedia(media));
	}
	const pageTitle = document.getElementById("title");
	pageTitle.textContent = photographer.name + " - FishEye";
	const photographerImg = newValue("about-photographer-img", { src: "./assets/img/Photographers_ID_Photos/" + photographer.portrait, alt: photographer.name, width: "200px", height: "200px" });
	const photographerCity = newValue("about-photographer-city", {}, photographer.city + ", " + photographer.country);
	const photographerName = newValue("about-photographer-name", {}, photographer.name);

	const photographerTagline = newValue("about-photographer-tagline", {}, photographer.tagline);
	const photographerTagsContainer = document.getElementById("about-photographer-tags-container");
	const photographerTagsContainerList = newElement("ul", photographerTagsContainer, { class: "about-photographer-tags-container" });
	for (let item in photographer.tags) {
		const photographerTags = newElement(
			"li",
			photographerTagsContainerList,
			{ class: "about-photographer-tags tag btn" + " btn-" + photographer.tags[item], onclick: "checkTag('" + photographer.tags[item] + "')", datafilter: "." + photographer.tags[item] },
			"#" + photographer.tags[item]
		);
	}
	const callToActionModalPhotographerName = newValue("call-to-action-modal-photographer-name", {}, photographer.name);
	const photographerPrice = newValue("about-photographer-price", {}, photographer.price + "€ / jour");

	filter();
	sort("Popularité");
}
render();

// Launch modal event
const modalbg = document.querySelector(".call-to-action-modal");
const modalBtn = document.querySelectorAll("#call-to-action-button");
const modalCloseBtn = document.querySelectorAll(".close1");
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// Issue #1 : close modal
// Close modal on click on X
modalCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal1));
// Close modal on click on confirmation button
//confirmationCloseBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal with a display="none"
function closeModal1() {
	modalbg.style.display = "none";
}

const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");

const errorFirst = document.getElementById("error-first");
const errorLast = document.getElementById("error-last");
const errorEmail = document.getElementById("error-email");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	// Regex for form validation
	const nameRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ ,.'-]*){2}$/g;
	const emailRegex = /(?=^.{5,255}$)^([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})$/g;
	const messageRegex = /^([A-Za-zÀ-ÖØ-öø-ÿ0-9][A-Za-zÀ-ÖØ-öø-ÿ0-9 ,.'-]*){20}$/g;
	let formValidated = true; // Need to be true to submit form

	// Function to check form inputs with regex and add errors messages if inputs are not validated
	function validateInput(input, regex, error) {
		const validated = input.value.match(regex);
		// If input is not validated : formValidated="false"
		if (!validated) {
			formValidated = false;
			error.style.display = "block";
			input.style.border = "0.2rem solid #fe142f";
		} else {
			error.style.display = "none";
			input.style.border = "0.05rem solid #ccc";
		}
	}

	validateInput(firstName, nameRegex, errorFirst);
	validateInput(lastName, nameRegex, errorLast);
	validateInput(email, emailRegex, errorEmail);
	validateInput(message, messageRegex, errorMessage);

	// Issue #4 : confirmation message
	// If form is validated, hide form and show confirmation message
	if (formValidated) {
		confirmation.style.display = "block";
		form.style.display = "none";
	}
});

// likes
const like = async (id, number) => {
	let mediaLikes = parseInt($("#like-" + id).text());
	mediaLikes = mediaLikes + number;
	$("#like-" + id).text(mediaLikes);

	let totalLikes = parseInt($("#about-photographer-likes-count").text());
	totalLikes = totalLikes + number;
	$("#about-photographer-likes-count").text(totalLikes);

	if (number === 1) {
		$("#likes-container-" + id).attr("onclick", "like(" + id + ", " + -1 + ")");
	} else {
		$("#likes-container-" + id).attr("onclick", "like(" + id + ", " + 1 + ")");
	}
};

// Filters
let filters = [];
const filter = async () => {
	await renderMedias();
	let $grid = $(".grid").isotope({
		itemSelector: ".itemSelector2",
		layoutMode: "fitRows",
		sortBy: "popularity",
		getSortData: {
			popularity: ".photographer-medias-likes-count parseInt",
			date: ".photographer-medias-date",
			title: ".photographer-medias-title",
		},
		sortAscending: {
			popularity: false,
			date: false,
			title: true,
		},
	});

	// change is-checked class on buttons
	$(".filters").on("click", "li", function (event) {
		let $target = $(event.currentTarget);
		let isChecked = $target.hasClass("is-checked");
		let filter = $target.attr("datafilter");
		if (isChecked) {
			addFilter(filter);
		} else {
			removeFilter(filter);
		}
		// filter isotope
		// group filters together, inclusive
		$grid.isotope({ filter: filters.join(",") });
		renderLightbox();
	});

	function addFilter(filter) {
		if (filters.indexOf(filter) == -1) {
			filters.push(filter);
		}
	}

	function removeFilter(filter) {
		let index = filters.indexOf(filter);
		if (index != -1) {
			filters.splice(index, 1);
		}
	}

	$(".sort-by-button-group").on("click", "a", function () {
		let sortValue = $(this).attr("data-sort-value");
		$grid.isotope({ sortBy: sortValue });
	});

	// change is-checked class on buttons
	$(".button-group").each(function (i, buttonGroup) {
		let $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "button", function () {
			$buttonGroup.find(".is-checked").removeClass("is-checked");
			$(this).addClass("is-checked");
		});
	});
};

const checkTag = (btn) => {
	let isChecked = $(".btn-" + btn).hasClass("is-checked");
	if (isChecked) {
		$(".btn-" + btn).removeClass("is-checked");
	} else {
		$(".btn-" + btn).addClass("is-checked");
	}
};

// Sort

const removeHide = (classname) => {
	const elements = document.querySelectorAll(classname);
	elements.forEach((el) => el.classList.remove("hide"));
};

const modifyDropdownTitle = (newTitle) => {
	const dropdownTitle = document.querySelectorAll("#dropdown-title");
	dropdownTitle[0].textContent = newTitle;
};

// LIGHTBOX

/* LIGHTBOX FUNCTION */
const renderLightbox = async () => {
	var data = await getData();

	const photographer = data.photographers.find((objet) => objet.id == id);
	const modalContent = document.getElementById("modal-content");
	// Remove existing Lightbox
	const mySlides = document.getElementsByClassName("mySlides");
	while (mySlides.length > 0) {
		mySlides[0].parentNode.removeChild(mySlides[0]);
	}

	if (filters.length != 0) {
		let datadata = "(";

		for (let i = 0; i < filters.length; i++) {
			let newData = "objet.tags == '" + filters[i].substring(1) + "'";
			if (i > 0) {
				datadata = datadata + " || " + newData;
			}
			if (i === 0) {
				datadata = datadata + newData;
			}
		}

		datadata = datadata + ")";
		var medias = mediasOfThisPhotograph.filter((objet) => objet.photographerId == id && eval(datadata));
		console.log(medias);
	} else {
		var medias = mediasOfThisPhotograph.filter((objet) => objet.photographerId == id);
	}

	for (let item in medias) {
		// render lightbox
		const imgOnClick = document.getElementById(medias[item].id);
		if (imgOnClick != null) {
			imgOnClick.setAttribute("onclick", "openModal();currentSlide(" + (+[item] + 1) + ")");
		}

		const mySlides = newElement("div", modalContent, { class: "mySlides" });

		const numberText = newElement("div", mySlides, { class: "numbertext" }, +[item] + 1 + " / " + medias.length);
		if (medias[item].image != null) {
			const photographerMedias = newElement("img", mySlides, {
				class: "modal-img",
				src: "./assets/img/" + photographer.name + "/" + medias[item].image,
				alt: medias[item].title,
			});
			const photographerMediasTitle = newElement("div", mySlides, { class: "caption-container" }, medias[item].title);
		} else if (medias[item].video != null) {
			let photographerMediasVideoContainer = newElement("video", mySlides, { class: "modal-img", width: "100%", height: "auto", controls: "true" });
			const photographerMediasVideo = newElement("source", photographerMediasVideoContainer, {
				src: "./assets/img/" + photographer.name + "/" + medias[item].video,
				type: "video/mp4",
			});
			const photographerMediasVideoTitle = newElement("div", mySlides, { class: "caption-container" }, medias[item].title);
		}
	}
	const prev = newElement("a", modalContent, { class: "prev", onclick: "plusSlides(-1)" }, "<");
	const next = newElement("a", modalContent, { class: "next", onclick: "plusSlides(1)" }, ">");
};

const sort = async (type) => {
	removeHide(".sort-button");
	if (type === "Date") {
		mediasOfThisPhotograph.sort((a, b) => b.date.localeCompare(a.date));
		const sortBtn = document.getElementById("sort-by-date");
		sortBtn.classList.add("hide");
	}
	if (type === "Titre") {
		mediasOfThisPhotograph.sort((a, b) => a.title.localeCompare(b.title));
		const sortBtn = document.getElementById("sort-by-name");
		sortBtn.classList.add("hide");
	}
	if (type === "Popularité") {
		mediasOfThisPhotograph.sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes));
		const sortBtn = document.getElementById("sort-by-popularity");
		sortBtn.classList.add("hide");
	}
	modifyDropdownTitle(type);
	renderLightbox();
};

// Open the Modal
function openModal() {
	document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
	document.getElementById("myModal").style.display = "none";
}
let slideIndex;
// Next/previous controls
function plusSlides(n) {
	showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides((slideIndex = n));
}

function showSlides(n) {
	let i;
	let slides = document.getElementsByClassName("mySlides");
	if (n > slides.length) {
		slideIndex = 1;
	}
	if (n < 1) {
		slideIndex = slides.length;
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}
/* ↑ INDEX ↑ */
