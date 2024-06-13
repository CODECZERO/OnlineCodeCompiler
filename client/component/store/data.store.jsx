import {createSlice} from "@reduxjs/toolkit";

const initialState={
    status:true,
    UserData:null,
}

const DataHandle=createSlice({
    name:"DataHandle",
    initialState,
    reducers:{
        addData:(state,action)=>{
            state.UserData=action.payload.UserData;
            state.status=action.payload.status;
        }
    }
})

export const {addData}=DataHandle.actions;
export default DataHandle.reducer;