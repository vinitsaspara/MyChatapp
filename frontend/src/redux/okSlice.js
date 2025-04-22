import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
})
// Will handle the action type `'counter/increment'`

export const {increment} = counterSlice.actions;
export default counterSlice.reducer;