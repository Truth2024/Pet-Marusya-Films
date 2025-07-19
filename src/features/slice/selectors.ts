import type { RootState } from '../../app/store';

//Trailer&SearchModal
export const selectTrailerModal = (state: RootState) => state.trailerModal;
export const selectSearchModal = (state: RootState) => state.trailerModal.isOpenSearch;
export { setOpenTrailer, setCloseTrailer } from './TrailerAndSearchModalSlice';
