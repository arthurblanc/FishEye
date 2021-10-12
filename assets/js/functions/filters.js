const loadRenderLightbox = async () => {
	const { renderLightbox } = await import("../render/renderLightbox.js");
	renderLightbox();
};

let filters = [];
const filter = async (waitForFunction, grid, itemSelector, layoutMode, sortBy, getSortData, sortAscending) => {
	await waitForFunction;
	let $grid = $(grid).isotope({
		itemSelector: itemSelector,
		layoutMode: layoutMode,
		sortBy: sortBy,
		getSortData: getSortData,

		sortAscending: sortAscending,
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

		if (document.location.pathname === "/photographer-page.html") {
			loadRenderLightbox();
		}
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

export { filter, checkTag, filters };
