import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTopicName: "", // Initial title
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setCurrentTopic: (state, action) => {
      state.currentTopicName = action.payload;
    },
  },
});

export const { setCurrentTopic } = topicSlice.actions;
export default topicSlice.reducer;
