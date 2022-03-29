import { combineReducers } from "redux";

//* Import slices
import wordsSlice from "./words.slice";

//* Combine
export const rootReducer = combineReducers({
  [wordsSlice.name]: wordsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
