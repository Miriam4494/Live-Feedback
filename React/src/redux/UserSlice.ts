import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginUserType, RegisterUserType, UserState, UserType } from "../types/User";
import axios from "axios";
import { RootState } from "./Store";
// import { jwtDecode } from "jwt-decode";


export const loginAndRegisterUser = createAsyncThunk('user/loginAndRegister',
  async (user: LoginUserType | RegisterUserType, thunkApi) => {
    // console.log("loginAndRegisterUser");
    
    try {
      const status = "UserName" in user ? "register" : "login";
      console.log("user+status ",user,status); 
      const response = await axios.post(
        `https://live-feedback-lgcr.onrender.com/api/Auth/${status}`,
        user
      );
      console.log(response.data);
      
      return response.data as UserType;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  });


export const updateUser = createAsyncThunk('user/update', async (user: UserType, thunkApi) => {
  try {
    console.log(user);

    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://live-feedback-lgcr.onrender.com/api/user/${user.id}`,
      { UserName: user.userName, Email: user.email, Password: user.password, RoleId: user.roleId ,Points:user.points,SendQuestion:user.sendQuestion,SendFeedback:user.sendFeedback},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return {...response.data,questions:user.questions }as UserType;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});


// const getUserIdFromToken = (token: string | null) => {
//   if (token) {
//     try {
//       const decoded = jwtDecode<jwtType>(token);
//       return decoded.sub;
//     } catch (error) {
//       console.error("Invalid token", error);
//       return null;
//     }
//   }
//   return null;
// };

// const fetchUserData = async ():Promise<UserState> => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     console.log(token);
    
//     try {
//       const userId = getUserIdFromToken(token);
//       console.log(userId);
      
//       if (!userId) {
//         console.error("Invalid token");
//       }
//       const response = await axios.get(`https://live-feedback-lgcr.onrender.com/api/User/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.data) {
//         return {user:response.data, loading: false, error: null};
//       }

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }
//   return {user:null, loading:false, error:null};
// };

// type jwtType = {
//   Token: String,
//   sub: string
// };

const  userSlice =  createSlice({
  name: "User",
  // initialState: await fetchUserData(),
  initialState: {} as UserState,
  reducers: {clearError: (state) => {
    state.error = null;
  },
  clearUser: (state) => {
    state.user = null;
    state.error = null; 
    state.loading = false;
  },},
  extraReducers(builder) {
    builder
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        // state.user = { ...action.payload }
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAndRegisterUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = { ...action.payload.user }
        console.log("in loginAndRegisterUser.fulfilled");
        console.log(action.payload.user);
        console.log("state.user");
        console.log(state.user);
        
        localStorage.setItem("token", action.payload.token);
        window.location.href = "/all";

      })
      .addCase(loginAndRegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginAndRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  }
})
export const { clearError,clearUser } = userSlice.actions
export const selectCompletedInvitations = (state: RootState) => state.User.user;
export default userSlice;




// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { LoginUserType, RegisterUserType, UserState, UserType } from "../types/User";
// import axios from "axios";
// import { RootState } from "./Store";
// import { jwtDecode } from "jwt-decode";
// // const apiUrl = import.meta.env.VITE_API_URL;
// // const apiUrl = import.meta.env.VITE_API_URL;
// const apiUrl = "https://live-feedback-lgcr.onrender.com/api/"


// type jwtType = {
//   Token: string;
//   sub: string;
// };

// // ========== Thunks ==========
// export const loginAndRegisterUser = createAsyncThunk(
//   "user/loginAndRegister",
//   async (user: LoginUserType | RegisterUserType, thunkApi) => {
//     try {
//       console.log("---------------------------");
//       console.log(apiUrl);
      
      
//       const status = "UserName" in user ? "register" : "login";
//       const response = await axios.post(
//         `${apiUrl}Auth/${status}`,
//         user
//       );
//       return response.data as { user: UserType; token: string };
//     } catch (error) {
//       return thunkApi.rejectWithValue("Login or register failed");
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "user/update",
//   async (user: UserType, thunkApi) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(
//         `${apiUrl}user/${user.id}`,
//         {
//           UserName: user.userName,
//           Email: user.email,
//           Password: user.password,
//           RoleId: user.roleId,
//           Points: user.points,
//           SendQuestion: user.sendQuestion,
//           SendFeedback: user.sendFeedback,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return { ...response.data, questions: user.questions } as UserType;
//     } catch (error) {
//       return thunkApi.rejectWithValue("Failed to update user");
//     }
//   }
// );

// const getUserIdFromToken = (token: string | null): string | null => {
//   if (token) {
//     try {
//       const decoded = jwtDecode<jwtType>(token);
//       return decoded.sub;
//     } catch (error) {
//       console.error("Invalid token", error);
//       return null;
//     }
//   }
//   return null;
// };

// export const fetchUserData = createAsyncThunk(
//   "user/fetchData",
//   async (_, thunkApi) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const userId = getUserIdFromToken(token);
//         if (!userId) throw new Error("Invalid token");
//         const response = await axios.get(
//           `${apiUrl}User/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         return response.data as UserType;
//       } catch (error) {
//         return thunkApi.rejectWithValue("Failed to fetch user");
//       }
//     }
//     return thunkApi.rejectWithValue("No token found");
//   }
// );

// // ========== Initial State ==========
// const initialState: UserState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// // ========== Slice ==========
// const userSlice = createSlice({
//   name: "User",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     clearUser: (state) => {
//       state.user = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action: PayloadAction<UserType>) => {
//         state.loading = false;
//         state.user = { ...state.user, ...action.payload };
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(loginAndRegisterUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         loginAndRegisterUser.fulfilled,
//         (state, action: PayloadAction<{ user: UserType; token: string }>) => {
//           state.loading = false;
//           state.user = { ...action.payload.user };
//           localStorage.setItem("token", action.payload.token);
//           window.location.href = "/all";
//         }
//       )
//       .addCase(loginAndRegisterUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       .addCase(fetchUserData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserType>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(fetchUserData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// // ========== Exports ==========
// export const { clearError, clearUser } = userSlice.actions;
// export const selectCompletedInvitations = (state: RootState) => state.User.user;
// export default userSlice;
