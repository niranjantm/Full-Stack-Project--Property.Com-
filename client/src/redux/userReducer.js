import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser:JSON.parse(localStorage.getItem("user")) || null,
    loading:false,
    error:null
}
console.log(initialState.currentUser);
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            const data = action.payload;
            localStorage.setItem("user",null);
            localStorage.setItem("user",JSON.stringify(data));
            console.log("state.currentUser------>",state.currentUser);
            state.currentUser = JSON.parse(localStorage.getItem("user"));
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        },
        userUpdateStart:(state)=>{
            state.loading=true;
        },
        userUpdateSuccess:(state,action)=>{
            state.loading=false;
            localStorage.setItem("user",JSON.stringify(action.payload));
            state.currentUser = action.payload;
            state.error = null
        },
        userUpdateFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteSuccess:(state)=>{
            localStorage.setItem("user",null);
            state.currentUser=null;
            state.error=null;
            state.loading = false;
        },
        deleteFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        }   
    }
})

export const{signInStart,signInSuccess,signInFailure,userUpdateFailure,userUpdateStart,userUpdateSuccess,deleteSuccess,deleteFailure} = userSlice.actions;
export default userSlice.reducer;