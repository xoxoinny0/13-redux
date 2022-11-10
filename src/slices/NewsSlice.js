import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = '/news';

/** 비동기 처리 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터이다.
export const getList = createAsyncThunk('NewsSlice/getList', async (payload, {rejectWithValue}) => {
    let result = null;
    
    try {
        const response = await axios.get(API_URL);
        result = response.data;
    } catch (err) {
        // 에러 발생 시 'rejectWithValue()'함수에 에러 데이터를 전달하면 extraReducer의 rejected 함수가 호출된다.
        result = rejectWithValue(err.response);
    }

    return result;
});

/** Slice 정의 */
const NewsSlice = createSlice({
    name: 'NewsSlice',
    initialState : {
        data: null, // Ajax 처리를 통해 수신된 데이터
        loading: false, // 로딩 여부
        error : null // 에러 정보
    },
    // 외부 action 및 비동기 action (ajax용)
    extraReducers: {
        [getList.pending] : (state, { payload }) => {
            return { ...state, loading: true}
        }, 
        [getList.fulfilled] : (state, { payload }) => {
            return {
                data : payload,
                loading: false,
                error : null
            }
        },
        [getList.rejected] : (state, { payload }) => {
            return {
                ...state,
                loading: false,
                error: {
                    code: payload?.status? payload.status : 500,
                    message: payload?.statusText? payload.statusText : 'Server Error'
                }
            }
        }
    },
});

// 리듀서 객체 내보내기
export default NewsSlice.reducer;