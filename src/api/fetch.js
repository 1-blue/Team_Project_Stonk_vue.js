import axios from "axios";

const config = {
    rootUrl: 'http://203.232.193.178:443/',
    testUrl: 'http://localhost:3000/',
}

async function fetchItems(){
	return await axios.get(`${config.testUrl}price`);
}

export {
    fetchItems
}