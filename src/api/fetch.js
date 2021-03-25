import axios from "axios";

async function fetchItems(){
    return await axios.get(`/api/price`);
}

async function fetchPostInfo(){
    return await axios.get(`/api/postInfo`);
}

async function fetchPost(title){
    return await axios.get(`/api/post/${title}`);
}

async function fetchUser(name){
    return await axios.get(`/api/user/${name}`);
}


export {
    fetchItems,
    fetchPostInfo,
    fetchPost,
    fetchUser
}