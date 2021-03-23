import axios from "axios";

const config = {
    rootUrl: 'http://203.232.193.178:443/',
    url: 'http://localhost:3000/',
}


async function fetchItems(){
    console.log(`${config.url}price`)
	return await axios.get(`${config.url}price`, {withCredentials: true,});
}

export {
    fetchItems
}