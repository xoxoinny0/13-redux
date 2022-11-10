import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


/** 비동기 처리 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터.
export const getMovieRank = createAsyncThunk('MovieRankSlice/getMovieRank', async (payload, { rejectWithValue}) => {
    let result = null;
   

    try {
        // API-URl과 API-KEY를 설정파일로부터 가져온다.
        const response = await axios.get(process.env.REACT_APP_KOBIS_API_URL, {
            params: {
                key: process.env.REACT_APP_KOBIS_API_KEY,
                // 컨트롤러에서 전달하는 파라미터는 payload로 전달된다.
                // --> 단일 값인 경우 payload 자체가 그 값, JSON인 경우 payload가 JSON이 된다.
                targetDt: payload.targetDt
            }
            });

            result = response.data
           
            // 영화진흥위원회 API는 에러가 발생하더라도 HTTP 상태코드는 200으로 응답이 오기 때문에 catch문이 동작하지 않는다.
        // 그러므로 직접 에러를 감지해야 한다.
        if(result.faultInfo !== undefined) {
            const err = new Error();
            err.response = {status: 500, statusText: result.faultInfo.message};
            throw err;
        } 
        


    } catch (err) {
        // 에러 발생시 'rejectWithValue()' 함수에 에러 데이터를 전달하면 extraReducer의 rejected 함수가 호출된다.
        result = rejectWithValue(err.response);

    }

    return result;
});

/** Slice 정의 */
const MovieRankSlice = createSlice({
    name: 'MovieRankSlice',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    // 외부 action 및 비동기 action (Ajax용)
    extraReducers: {
        [getMovieRank.pending] : (state, { payload }) => {
            return {...state, loading: true}
        },
        [getMovieRank.fulfilled] : (state, { payload }) => {
            
            return {
                data: payload,
                loading : false,
                error: null
            }
        },
        [getMovieRank.rejected] : (state, { payload }) => {
           
            return {
                ...state,
                loading: false,
                error: {
                    code: payload?.status ? payload.status : 500,
                    message: payload?.statusText ? payload.statusText : 'Server Error'
                }
            }
        }
    }
});

// 리듀서 객체 내보내기
export default MovieRankSlice.reducer;