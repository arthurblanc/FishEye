// Async function to load renderLightbox function
const loadRenderLightbox = async () => {
	const { renderLightbox } = await import("../render/renderLightbox.js");
	renderLightbox();
};

// Create filters array
let filters = [];
// Filter async function
const filter = async (waitForFunction, grid, itemSelector, layoutMode, sortBy, getSortData, sortAscending) => {
	await waitForFunction;
	let $grid = $(grid).isotope({
		itemSelector: itemSelector,
		layoutMode: layoutMode,
		sortBy: sortBy,
		getSortData: getSortData,
		sortAscending: sortAscending,
	});

	// If .filters buttons isChecked = add filters
	$(".filters").on("click", "button", function (event) {
		let $target = $(event.currentTarget);
		let isChecked = $target.hasClass("is-checked");
		let filter = $target.attr("data-filter");
		if (isChecked) {
			addFilter(filter);
		} else {
			removeFilter(filter);
		}
		// group filters together, inclusive
		$grid.isotope({ filter: filters.join(",") });

		// renderLightbox on photographer-page
		if (document.location.pathname === "/photographer-page.html") {
			loadRenderLightbox();
		}
	});

	// Function to add filter
	function addFilter(filter) {
		if (filters.indexOf(filter) == -1) {
			filters.push(filter);
		}
	}

	// Function to remove filter
	function removeFilter(filter) {
		let index = filters.indexOf(filter);
		if (index != -1) {
			filters.splice(index, 1);
		}
	}

	// Get sortValue on .sort-by-button-group buttons
	$(".sort-by-button-group").on("click", "button", function () {
		let sortValue = $(this).attr("data-sort-value");
		$grid.isotope({ sortBy: sortValue });
	});

	// Change is-checked class on .button-group buttons
	$(".button-group").each(function (i, buttonGroup) {
		let $buttonGroup = $(buttonGroup);
		$buttonGroup.on("click", "button", function () {
			$buttonGroup.find(".is-checked").removeClass("is-checked");
			$(this).addClass("is-checked");
		});
	});
};

// Function to check if tags are checked/pressed
const checkTag = (btn) => {
	let isChecked = $(".btn-" + btn).hasClass("is-checked");
	if (isChecked) {
		$(".btn-" + btn).removeClass("is-checked");
		$(".btn-" + btn).attr("aria-pressed", "false");
	} else {
		$(".btn-" + btn).addClass("is-checked");
		$(".btn-" + btn).attr("aria-pressed", "true");
	}
};

export { filter, checkTag, filters };
