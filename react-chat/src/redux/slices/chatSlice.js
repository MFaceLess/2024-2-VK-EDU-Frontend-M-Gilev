import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../../entityes/fetchMessages";

const initialState = {
    messages: [],
    chatId: null,
    contextMenu: { visible: false, x: 0, y: 0, messageId: null},
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload;
        },
        addMessages(state, action) {
            state.messages.push(action.payload);
        },
        removeMessages(state, action) {
            state.messages = state.messages.filter((msg) => msg.id !== action.payload)
        },
        setChatId(state, action) {
            state.chatId = action.payload;
        },
        setContextMenu(state, action) {
            state.contextMenu = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.error('Error fetching messages:', action.payload);
            });
    },
});

export const { setMessages, addMessages, removeMessages, setChatId, setContextMenu } = chatSlice.actions;
export default chatSlice.reducer;