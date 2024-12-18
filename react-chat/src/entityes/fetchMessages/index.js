import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWithAuth } from '../API/auth/fetchWithRefresh'

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ chatId, navigate }, thunkAPI) => {
    try {
      const chat = chatId
      const page_size = 150
      const params = new URLSearchParams({ chat, page_size })
      const response = await fetchWithAuth(fetch, navigate) (
        `https://vkedu-fullstack-div2.ru/api/messages/?${params.toString()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json'
        }
      })
      // const data = await response.json();
      return response.results.reverse().map((message) => ({
        sender: `${message.sender.first_name} ${message.sender.last_name}`,
        time: new Date(message.created_at).toLocaleString(),
        text: message.text,
        id: message.id,
        senderId: message.sender.id,
        files: message.files ? message.files.map(file => file.item) : [],
        voice: message.voice
      }))
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)
