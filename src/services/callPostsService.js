import { POSTS_URL } from "../constants/api";
import axios from 'axios';

/**
 * @function
 * @description Create the GET request to get posts and handle data 
 * @param {Number} page current number
 * @returns {Array | null} 
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

/**
 * @function
 * @description Create the POST request to add new post 
 * @param {Object} payload Object with new post options
 * @returns {Object|null} with new added post id 
 */
export const addNewRemotePost = async (payload) => {
  try {
    const result = await axios.post(POSTS_URL, payload);
    return result.data
  } catch (error) {
    console.error('Error Adding data:', error);
    return null

  }

}

/**
 * @function
 * @description Create DELETE request to remove post 
 * @param {Number} id current post id
 * @returns {Number|null}  status code
 */
export const deleteRemotePost = async (id) => {
  try {
    const result = await axios.delete(`${POSTS_URL}/${id}`);
    return result.status
  } catch (error) {
    console.error('Error Adding data:', error);
    return null

  }

}


/**
 * @function
 * @description Create PATCH request to update post 
 * @param {Number} id current post id
 * @param {Object} payload new post data
 * @returns {Number|null}  status code
 */
export const updateRemotePost = async (id, payload) => {
  try {
    const result = await axios.patch(`${POSTS_URL}/${id}`, payload);
    return result?.status
  } catch (error) {
    console.error('Error Adding data:', error);
    return null
  }

}