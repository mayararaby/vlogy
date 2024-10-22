import { POSTS_URL } from "../constants/api";
import axios from 'axios';

/**
 * @description Create the GET request and handle data 
 */
export const fetchPosts = async (page = 1) => {

  try {
    const posts = await axios.get(POSTS_URL, {
      params: {
        _page: page,
        _limit: 10,
      },
    });

    return posts.data.map(post => ({ ...post, isFavorite: false }))
  } catch (error) {
    console.error('Error fetching data:', error);

    return null
  }
}


export const addNewRemotePost = async (payload) => {
  try {
    const result = await axios.post(POSTS_URL, payload);
    return result.data
  } catch (error) {
    console.error('Error Adding data:', error);
    return null

  }

}


export const deleteRemotePost = async (id) => {
  try {
    const result = await axios.delete(`${POSTS_URL}/${id}`);
    return result.status
  } catch (error) {
    console.error('Error Adding data:', error);
    return null

  }

}



export const updateRemotePost = async (id, payload) => {
  try {
    const result = await axios.patch(`${POSTS_URL}/${id}`, payload);
    return result?.status
  } catch (error) {
    console.error('Error Adding data:', error);
    return null
  }

}