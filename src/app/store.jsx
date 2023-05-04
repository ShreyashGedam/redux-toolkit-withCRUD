import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../components/formSlice";

export default configureStore({
    reducer: {
        form: formReducer
    }
})