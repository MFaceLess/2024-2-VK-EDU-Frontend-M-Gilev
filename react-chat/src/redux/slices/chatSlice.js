import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../../entityes/fetchMessages";
import { startDialog } from "../../entityes/fetchStartDialog";

const initialState = {
    messages: [],
    chatId: null,
    contextMenu: { visible: false, x: 0, y: 0, messageId: null},
    loading: false,
    chatExist: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages(state, action) {
            state.messages = action.payload;
        },
        addMessages(state, action) {
            state.messages = [...state.messages, action.payload]
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
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.chatExist = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
                state.chatExist = true;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.chatExist = false;
                console.error('Error fetching messages:');
            })
            .addCase(startDialog.fulfilled, (state, action) => {
                const { id } = action.payload;
                state.chatExist = true;
                state.chatId = id;
                state.messages = [];
                alert('Чат успешно создан!');
            })
            .addCase(startDialog.rejected, (state, action) => {
                state.chatExist = false;
                alert('Ошибка при создании чата');
            })
    },
});

export const { setMessages, addMessages, removeMessages, setChatId, setContextMenu } = chatSlice.actions;
export default chatSlice.reducer;