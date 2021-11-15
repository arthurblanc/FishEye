// Function to update attributes and contents of a element
const newValue = (id, textContent) => {
	const element = document.getElementById(id);
	element.textContent = textContent;
	return element;
};
export { newValue };
