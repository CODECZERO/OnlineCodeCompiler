import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:true,
    UserData:null,
    output:null,
}

const DataHandle=createSlice({
    name:"DataHandle",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.UserData=action.payload.UserData;
            state.status=action.status;
        },
        ouptputData:(state,action)=>{
            state.output=action.payload.output;
        },
    }
})

export const {addData,ouptputData}=DataHandle.actions;
export default DataHandle.reducer;