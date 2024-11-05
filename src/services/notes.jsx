import axios from 'axios';

export async function getData(url) {
    const response = await axios.get(url);
    return response.data;
}

export async function postData(url, obj) {
    const response = await axios.post(url, obj);
    return response.data;
}

export async function updateData(url, obj) {
    const response = await axios.put(url, obj);
    return response.data;
}

export async function deleteData(url) {
    const response = await axios.delete(url);
    return response.data;
}