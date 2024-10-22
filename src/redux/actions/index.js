import * as actionsType from "../../constants/actions";

export const setPosts = (posts) => ({
  type:actionsType.SET_POSTS,
  payload: posts,
});

export const addPosts = (posts) => ({
  type: actionsType.ADD_POSTS,
  payload: posts,
})