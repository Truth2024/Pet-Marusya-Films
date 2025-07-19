import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  isOpenTrailer: boolean;
  isOpenSearch: boolean;
  url: string;
}

const initialState: CounterState = {
  isOpenTrailer: false,
  url: '',
  isOpenSearch: false,
};

export const trailerModal = createSlice({
  name: 'trailerModal',
  initialState,
  reducers: {
    setOpenTrailer: (state, action: PayloadAction<string>) => {
      state.isOpenTrailer = true;
      state.url = action.payload;
    },
    setCloseTrailer: (state) => {
      state.isOpenTrailer = false;
      state.url = '';
    },

    setOpenSearch: (state) => {
      state.isOpenSearch = true;
    },
    setCloseSearch: (state) => {
      state.isOpenSearch = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenTrailer, setCloseTrailer, setOpenSearch, setCloseSearch } = trailerModal.actions;

export default trailerModal.reducer;
