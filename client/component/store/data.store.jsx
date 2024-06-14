import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:true,
    UserData:null,
    language:null,
    sock:false,
    error:null,
}

const DataHandle=createSlice({
    name:"DataHandle",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.UserData=action.payload.UserData;
            state.status=action.payload.status;
        }
        ,
        addlanguage:(state,action)=>{
            state.language=action.payload.language;
        },
        addsock:(state,action)=>{
            state.sock=action.payload.sock;
        },
        addError:(state,action)=>{
            state.error=action.payload.error;
        },
        removeError:(state)=>{
            state.error=null;
        }
    }
})

export const {addData,addlanguage,addsock,removeError,addError}=DataHandle.actions;
export default DataHandle.reducer;