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
    
   return posts.data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
