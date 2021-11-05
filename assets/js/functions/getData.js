// Async function to fetch data in a json
const getData = async () => {
	const url = "./assets/json/FishEyeData.json";
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

export { getData };
