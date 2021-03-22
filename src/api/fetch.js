import axios from "axios";

const config = {
    rootUrl: 'http://203.232.193.178:443/',
}

function fetchItems(){
	return axios.get(`${config.rootUrl}price`);
}

export {
    fetchItems
}