import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./slices/counterSlice";
import DepartmentSlice from "./slices/DepartmentSlice";

const store = configureStore({
    // 개발자가 직접 작성한 Slice 오브젝트들이 명시되어야 한다.
    reducer: {
        CounterSlice : CounterSlice,
        DepartmentSlice : DepartmentSlice
    }
});

export default store;