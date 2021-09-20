/* ↓ INDEX ↓ */
/* Requête fetch pour récuperer la liste des articles et leurs détails */
const getData = async () => {
	const url = "./assets/json/FishEyeData.json";
	const response = await fetch(url);
	const data = await response.json();

	return data;
};

class Photographer {
	constructor(data) {
		this.name = data.name;
		this.id = data.id;
		this.city = data.city;
		this.country = data.country;
		this.tags = data.tags;
		this.tagline = data.tagline;
		this.price = data.price;
		this.portrait = data.portrait;
	}
}

let photographers = [];

const photographerList = document.getElementById("photographer-list");

const renderPhotographersList = async () => {
	for (let i = 0; i < photographers.length; i++) {
		const photographerCard = newElement("article", photographerList, { class: "photographer-card itemSelector" });

		const photographerCardPortraitContainer = newElement("div", photographerCard, { class: "photographer-card-portrait-container" });
		const photographerCardPortraitLink = newElement("a", photographerCardPortraitContainer, { class: "photographer-card-portrait-link", href: "./photographer-page.html?id=" + photographers[i].id });
		const photographerCardImg = newElement("img", photographerCardPortraitLink, {
			class: "photographer-card-img",
			src: "./assets/img/Photographers_ID_Photos/" + photographers[i].portrait,
			alt: photographers[i].name,
			width: "200px",
			height: "200px",
		});
		const photographerCardName = newElement("h2", photographerCardPortraitLink, { class: "photographer-card-name" }, photographers[i].name);

		const photographerCardTextContainer = newElement("div", photographerCard, { class: "photographer-card-text-container" });
		const photographerCardCity = newElement("p", photographerCardTextContainer, { class: "card-city" }, photographers[i].city + ", " + photographers[i].country);
		const photographerCardTagline = newElement("p", photographerCardTextContainer, { class: "card-tagline" }, photographers[i].tagline);
		const photographerCardPrice = newElement("p", photographerCardTextContainer, { class: "card-price" }, photographers[i].price + "€/jour");

		const photographerCardTagsContainer = newElement("ul", photographerCard, { class: "photographer-card-tags-container filters" });
		for (let item in photographers[i].tags) {
			photographerCard.classList.add(photographers[i].tags[item]);
			const photographerCardTags = newElement(
				"li",
				photographerCardTagsContainer,
				{ class: "photographer-card-tags tag btn btn-" + photographers[i].tags[item], onclick: "checkTag('" + photographers[i].tags[item] + "')", datafilter: "." + photographers[i].tags[item] },
				"#" + photographers[i].tags[item]
			);
		}
	}
};

async function render() {
	var data = await getData();
	for (let photographer of data.photographers) {
		photographers.push(new Photographer(photographer));
	}
	renderPhotographersList();
	filter();
}
render();

/* TO CONTTENT BTN*/
const toContentBtn = document.getElementById("to-content-btn");
//toContentBtn.classList.add("to-content-btn-show");

window.addEventListener("scroll", checkScrollPosition);

function checkScrollPosition() {
	if (window.pageYOffset >= 20) {
		toContentBtn.classList.add("to-content-btn-show");
	} else {
		toContentBtn.classList.remove("to-content-btn-show");
	}
}
// Filters
let filters = [];
const filter = async () => {
	let $grid = $(".grid").isotope({
		itemSelector: ".itemSelector",
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
/* ↑ INDEX ↑ */
