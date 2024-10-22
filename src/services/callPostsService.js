import {  POSTS_URL } from "../constants/api";
import axios from 'axios';
import { setNewPosts } from "../redux/actions";

/**
 * @description Create the GET request and handle data 
 */
export const fetchPosts = async (dispatch,page) => {

  try {
    const posts = await axios.get(POSTS_URL, {
      params: {
        _page: page,
        _limit: 10,
      },
    });

    // const posts = await axios.get(POSTS_URL);
    console.log({posts})
    // const data = posts.data.results.map(contact=>({...contact, uuid: uuidv4(), char:contact.name.first.charAt(0) }))
    // dispatch(setNewContacts(data))
    // const filteredResult = mapResultWithLetters(data)
    // dispatch(setFilterContacts(filteredResult))
    
    // return contacts.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
}
