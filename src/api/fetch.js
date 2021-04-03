import axios from "axios";
import bus from '../utils/bus.js';

async function fetch(url, errorMessage) {
    bus.$emit("on:spinner");
    let data = {};
    try {
        data = await axios.get(url);
    } catch (error) {
        data = {
            error,
            message: `${errorMessage}... 잠시후에 다시시도해주세요`
        };
    }
    bus.$emit("off:spinner");
    return data;
}

function fetchItems() {
    return fetch(`/api/price`, "price load error");
}

async function fetchCommunity() {
    return fetch(`/api/post`, "community load error");
}

async function fetchPost(title) {
    return fetch(`/api/post/${title}`, "post info load error");
}

async function fetchUser(name) {
    return fetch(`/api/user/${name}`, "user info load error");
}

async function fetchDeletePost(title) {
    try {
        return await axios.delete(`/api/post/${title}`);
    } catch (error) {
        return error;
    }
}

export {
    fetchItems,
    fetchCommunity,
    fetchPost,
    fetchUser,
    fetchDeletePost,
}