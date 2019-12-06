export default {
	getAll: async () => {
    let response = await fetch(`/api/product`);
		let data = await response.json();

		console.log(response, data);
		
		return data || [];
	}
};
