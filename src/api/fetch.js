import axios from "axios";

const config = {
    rootUrl: 'http://203.232.193.178:443/',
    testUrl: 'http://localhost:3000/',
}

async function fetchItems(){
	return await axios.get(`${config.testUrl}price`);
}

async function fetchPostInfo(){
	return await axios.get(`${config.testUrl}postInfo`);
}

async function fetchPost(title){
	return await axios.get(`${config.testUrl}post/${title}`);
}

async function fetchUser(name){
	return await axios.get(`${config.testUrl}user/${name}`);
}


export {
    fetchItems,
    fetchPostInfo,
    fetchPost,
    fetchUser
}