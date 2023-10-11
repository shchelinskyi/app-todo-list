import {createSlice} from '@reduxjs/toolkit';

type FormState = {
    isOpenedForm: boolean
}

const initialState: FormState = {
    isOpenedForm: false
};

const creatingFormSlice = createSlice({
    name: 'isCreatingForm',
    initialState,
    reducers: {
        openForm: (state) => {
            state.isOpenedForm = true;
        },
        closeForm: (state) => {
            state.isOpenedForm = false;
        },
    },
});

export const {
    openForm,
    closeForm,
} = creatingFormSlice.actions;

export default creatingFormSlice.reducer;