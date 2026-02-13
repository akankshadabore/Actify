import { createSlice } from '@reduxjs/toolkit';

const initialAccounts = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        firstName: ['Ashish', 'Rahul', 'Priya', 'Sneha', 'Amit'][Math.floor(Math.random() * 5)],
        middleName: ['', 'Kumar', 'Singh', '', 'Dev'][Math.floor(Math.random() * 5)],
        lastName: ['Sharma', 'Verma', 'Patel', 'Gupta', 'Yadav'][Math.floor(Math.random() * 5)],
        email: `user${id}@example.com`,
        phone: `98765432${id.toString().padStart(2, '0')}`,
        address: `${id} Some Street, Some Area`,
        pinCode: `1100${id.toString().padStart(2, '0')}`,
        country: 'India',
        state: ['Delhi', 'Maharashtra', 'Karnataka', 'UP'][Math.floor(Math.random() * 4)],
        city: ['New Delhi', 'Mumbai', 'Bangalore', 'Lucknow'][Math.floor(Math.random() * 4)],
    };
});

const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        items: initialAccounts,
        status: 'idle',
        error: null,
    },
    reducers: {
        addAccount: (state, action) => {
            const newId = state.items.length > 0 ? Math.max(...state.items.map(i => i.id)) + 1 : 1;
            state.items.push({ ...action.payload, id: newId });
        },
        updateAccount: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteAccount: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    },
});

export const { addAccount, updateAccount, deleteAccount } = accountsSlice.actions;

export default accountsSlice.reducer;
