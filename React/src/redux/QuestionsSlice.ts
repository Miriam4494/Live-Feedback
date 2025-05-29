import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Question } from "../components/QuestionsList";
import { RootState } from "./Store";
import { QuestionState } from "../types/User";
const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = "https://live-feedback-lgcr.onrender.com/api/"


export const getQuestions = createAsyncThunk('Questions/get', async (_, thunkApi) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiUrl}Question`,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);

        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);

    }
});
export const deleteQuestion = createAsyncThunk('Questions/delete', async (questionId: number, thunkApi) => {
    try {
        const response = await axios.delete(`${apiUrl}Question/${questionId}`,
            { headers: { Authorization: `Bearer` + localStorage.getItem("token") } }
        );
        console.log(response.data);

        return response.data
    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);
    }
});

export const updateQuestion = createAsyncThunk('Questions/put', async (question: Question, thunkApi) => {
    try {

        console.log("Questions update");
        console.log(question);
        //לטפל בשרת למה חוזר ריק?

        const response = await axios.put(`${apiUrl}Question/${question.id}`,
            question,
            { headers: { Authorization: `Bearer` + localStorage.getItem("token") } }
        );
        console.log(response.data);
        return response.data;

    } catch (error: any) {
        return thunkApi.rejectWithValue(error.message);

    }
});

// export const updateUseQuestion = createAsyncThunk('Questions/put', async (questionId: number, thunkApi) => {
//     try {


//         const response = await axios.put(`https://localhost:7230/api/Question/${questionId}`,
//             { headers: { Authorization: `Bearer` + localStorage.getItem("token") } }
//         );
//         console.log(response.data);
//         return response.data;

//     } catch (error: any) {
//         return thunkApi.rejectWithValue(error.message);

//     }
// });

export const updateUseQuestion = createAsyncThunk('Questions/updateUsersUse', async (questionId: number, thunkApi) => {
    try {
        // שליחת בקשת PUT לשרת
        const response = await axios.put(
            `${apiUrl}Question/updateUsersUse/${questionId}`,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, }

        );

        console.log(response.data); // הדפסת התגובה ל-debugging
        return response.data; // החזרת התוצאה
    } catch (error: any) {
        console.error("Error updating usersUse:", error); // הדפסת שגיאה ל-debugging
        return thunkApi.rejectWithValue(error.message); // החזרת שגיאה
    }
})

const QuestionsSlice = createSlice({
    name: "Questions",
    initialState: {} as QuestionState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload
                console.log(state.questions);
                
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getQuestions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload
            })
            .addCase(updateQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUseQuestion.fulfilled, (state, /*action*/) => {
                state.loading = false;
                // state.questions = action.payload
            })
            .addCase(updateUseQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateUseQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
    }
})
export const selectQuestions = (state: RootState) => state.Questions.questions;
export default QuestionsSlice;