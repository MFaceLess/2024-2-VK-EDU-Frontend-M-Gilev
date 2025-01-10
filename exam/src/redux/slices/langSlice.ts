import { createSlice } from '@reduxjs/toolkit';


interface HistoryItem {
    sourceLang: string;
    targetLang: string;
    initString: string;
    result: string;
}

interface LangState {
    initString: string;
    result: string;
    sourceLang: string;
    targetLang: string;
    history: HistoryItem[];
}

const initialState: LangState = {
    initString: '',
    result: '',
    sourceLang: '',
    targetLang: '',
    history: [],
}


const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setSrcLang (state, action) {
        state.sourceLang = action.payload;
    },
    setTgtLang (state, action) {
        state.targetLang = action.payload;
    },
    setInitString (state, action) {
        state.initString = action.payload;
    },
    setResString (state, action) {
        state.result = action.payload;
    },
    addToHistory (state) {
        state.history = [...state.history, {sourceLang: state.sourceLang, targetLang: state.targetLang, initString: state.initString, result: state.result}];
    },
    removeHistory (state) {
        state.history = [];
    },
    setHistory (state, action) {
        state.history = action.payload;
    }
  },
})

export const { setSrcLang, setTgtLang, setInitString, setResString, addToHistory, removeHistory, setHistory } = langSlice.actions;
export default langSlice.reducer;