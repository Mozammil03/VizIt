import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    visit: (state) => {
      state.count += 1;
    },
  },
});

export const { visit } = countSlice.actions;
export default countSlice.reducer;
