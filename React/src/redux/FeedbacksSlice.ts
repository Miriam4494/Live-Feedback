import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./Store";
import { FeedbackState } from "../types/User";
import { Feedback } from "../components/FeedbackSection";


export const AddFeedback = createAsyncThunk('Feedback/post', async (feedback:Feedback,thunkApi) => {
  try {
    const response = await axios.post("https://localhost:7230/api/Feedback",
       feedback
    );
    console.log(response);
    
    return response.data
  } catch (error:any) {
    return thunkApi.rejectWithValue(error.message);

  }
});

export const GetFeedback = createAsyncThunk('Feedback/get', async (_,thunkApi) => {
  try {
    const response = await axios.get("https://localhost:7230/api/Feedback",
       {
        headers: {
          'Authorization': 'Bearer'+ localStorage.getItem('token')
        }
      }
    );
    console.log(response);
    
    return response.data
  } catch (error:any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
const FeedbacksSlice = createSlice({
  name: "Feedbacks",
  initialState: {} as FeedbackState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(AddFeedback.fulfilled, (state, action) => {
        state.loading= false;
        // state.feedbacks = { ...action.payload.data}
        state.feedbacks = action.payload.data

      })
      .addCase(AddFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(AddFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetFeedback.fulfilled, (state, action) => {
        state.loading= false;
        // state.feedbacks = { ...action.payload.data }
        state.feedbacks = action.payload.data

      })
      .addCase(GetFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(GetFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  }
})
export const selectQuestions = (state: RootState) => state.Feedbacks.feedbacks;
export default FeedbacksSlice;