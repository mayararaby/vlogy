import * as actionsType from "../../constants/actions";

export const setNewPosts = (posts) => ({
  type: actionsType.SET_POSTS,
  payload: posts
})
