import * as actionTypes from "../../constants/actions"

const initialState = {
  posts: [],
}

export const postsReducer = (state = initialState, { type, payload }) => {
  console.log({payload})
  switch (type) {
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: payload
      }

   
    default:
      return state
  }
}
