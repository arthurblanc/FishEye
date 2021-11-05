// Function to create element with attributes and contents
const newElement = (type, parent, attributes, ...contents) => {
	const element = document.createElement(type);
	if (parent) {
		parent.appendChild(element);
	}
	for (key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	contents.forEach((content) => {
		if (typeof content === "string") {
			element.appendChild(document.createTextNode(content));
		} else {
			element.appendChild(content);
		}
	});
	return element;
};

// Function to update attributes and contents of a element
const newValue = (id, attributes, textContent) => {
	const element = document.getElementById(id);
	for (key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
	element.textContent = textContent;
	return element;
};
