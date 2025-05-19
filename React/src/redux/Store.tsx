import { combineSlices, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import QuestionsSlice from "./QuestionsSlice";
import FeedbacksSlice from "./FeedbacksSlice";


export const store = configureStore({
    reducer: combineSlices(
        UserSlice,
        QuestionsSlice,
        FeedbacksSlice
    )

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;