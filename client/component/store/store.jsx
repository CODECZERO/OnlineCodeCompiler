import { configureStore } from "@reduxjs/toolkit";
import DataHandle from './data.store';

const store=configureStore({
    reducer:{
        Data:DataHandle,
    }
})

export default store;