import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = "http://localhost:3000";

// 🔹 Fetch comments by article
export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (articleId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/comment/${articleId}`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching comments");
        }
    }
);

// 🔹 Delete comment
export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (commentId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/comment/${commentId}`);
            return commentId;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting comment");
        }
    }
);

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch comments
            .addCase(fetchComments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Delete comment
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.list = state.list.filter((comment) => comment._id !== action.payload);
            });
    },
});

export default commentSlice.reducer;
