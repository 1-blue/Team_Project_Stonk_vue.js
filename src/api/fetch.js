import axios from "axios";
import bus from '../utils/bus.js';

async function fetch(url, errorMessage) {
    setTimeout(() => {
        bus.$emit("on:spinner");
    }, 500)
    
    let data = {};
    try {
        data = await axios.get(url);
    } catch (error) {
        data = {
            error,
            message: `${errorMessage}... 잠시후에 다시시도해주세요`
        };
    }
    setTimeout(() => {
        bus.$emit("off:spinner");
    }, 500)
    return data;
}

function fetchItems() {
    return fetch(`/api/price`, "price load error");
}

async function fetchCommunity() {
    return fetch(`/api/post`, "community load error");
}

async function fetchPost(postid) {
    return fetch(`/api/post/${postid}`, "post info load error");
}

async function fetchUser(nickname) {
    return fetch(`/api/user/${nickname}`, "user info load error");
}

async function fetchVisitPost(postid) {
    try {
        const data = await axios.put(`/api/post/${postid}`);
        return data.data
    } catch (error) {
        console.error(error);
    }
}

async function fetchDeletePost(postid) {
    try {
        return await axios.delete(`/api/post/${postid}`);
    } catch (error) {
        return error;
    }
}

async function fetchLogout() {
    return fetch(`api/auth/logout`, "logout error");
}

async function fetchSignOut(nickname) {
    try {
        return await axios.delete(`api/auth/signOut/${nickname}`);
    } catch (error) {
        console.log(error);
    }
}

async function fetchComments(postId) {
    try {
        const data = await axios.get(`api/comment/${postId}`);
        return data.data;
    } catch (error) {
        console.log(error);
    }  
}

async function fetchDeleteComments(commentId) {
    try {
        const data = await axios.delete(`api/comment/${commentId}`);
        return data.data
    } catch (error) {
        console.error(error);
    }
}


export {
    fetchItems,
    fetchCommunity,
    fetchPost,
    fetchUser,
    fetchVisitPost,
    fetchDeletePost,
    fetchLogout,
    fetchSignOut,
    fetchComments,
    fetchDeleteComments
}