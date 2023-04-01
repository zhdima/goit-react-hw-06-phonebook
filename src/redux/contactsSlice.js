import { createSlice, nanoid } from "@reduxjs/toolkit";
import initContacts from '../contacts.json';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initContacts,
  reducers: {

    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(contact) {
        return {
          payload: {
            ...contact,
            id: nanoid(),
          },
        };
      },
    },

    deleteContact(state, action) {
      return state.filter(({ id }) => (id !== action.payload))
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
