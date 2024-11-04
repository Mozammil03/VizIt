// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "./topicSlice";

export default configureStore({
  reducer: {
    topic: topicReducer,
  },
});
