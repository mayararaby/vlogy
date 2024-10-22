import * as actionsType from "../../constants/actions";

export const setPosts = (posts) => ({
  type:actionsType.SET_POSTS,
  payload: posts,
});

