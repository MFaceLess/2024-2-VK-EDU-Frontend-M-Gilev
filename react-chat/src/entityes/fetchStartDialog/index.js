import { createAsyncThunk } from '@reduxjs/toolkit'

export const startDialog = createAsyncThunk(
  'chat/startDialog',
  async (friendId, { rejectWithValue }) => {
    try {
      // const getParams = new URLSearchParams({ fallback: 'on'});
      const response = await fetch('https://vkedu-fullstack-div2.ru/api/chats/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          members: [friendId],
          is_private: true,
          title: 'chat'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }

      const data = await response.json()
      return data
    } catch (error) {
      return rejectWithValue(error[0])
    }
  }
)
