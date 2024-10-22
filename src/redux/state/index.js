import { configureStore } from '@reduxjs/toolkit'
import {postsReducer} from '../reducer/index'

export default configureStore({
  reducer: postsReducer,
})