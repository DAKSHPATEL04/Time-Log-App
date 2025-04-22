import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("crudData")) || [],
  filter: {
    month: "",
    timeRange: "",
  },
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addEntry: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem("crudData", JSON.stringify(state.data));
    },
    updateEntry: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[index] = action.payload;
      localStorage.setItem("crudData", JSON.stringify(state.data));
    },
    deleteEntry: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
      localStorage.setItem("crudData", JSON.stringify(state.data));
    },
    setFilter: (state, action) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    clearFilter: (state) => {
      state.filter = { month: "", timeRange: "" };
    },
  },
});

export const { addEntry, updateEntry, deleteEntry, setFilter, clearFilter } =
  dataSlice.actions;
export default dataSlice.reducer;
