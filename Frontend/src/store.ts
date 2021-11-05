import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
// import messagesReducer from './redux/features/messages/messagesSlice'
import messagesReducer from '@features/messages/messageSlice'
import contactsReducer from '@features/contacts/contactsSlice'
import userReducer from '@features/user/userSlice'
import apiSlice from '@features/api/apiSlice'

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user : userReducer,
    currentChat: messagesReducer,
    contacts: contactsReducer,
    api: apiSlice
  },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export default store