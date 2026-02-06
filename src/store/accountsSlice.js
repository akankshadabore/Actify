import { createSlice } from '@reduxjs/toolkit';

const initialAccounts = Array.from({ length: 100 }, (_, i) => {
    const id = i + 1;
    return {
        id,
        name: `Account ${id}`,
        email: `user${id}@example.com`,
        phone: `98765432${id.toString().padStart(2, '0')}`,
        website: `https://site${id}.com`,
        industry: ['Technology', 'Finance', 'Healthcare', 'Retail'][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.3,
        remark: `Sample remark for account ${id}`
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
