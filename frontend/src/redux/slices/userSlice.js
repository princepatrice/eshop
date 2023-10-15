import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    user: {
        id: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        shippingAddress: null,
        shippingCity: null,
        shippingCountry: null,
        billingAddress: null,
        billingCity: null,
        billingCountry: null,
        cardNumber: null,
        cardType: null
    }

}

const userSlice = createSlice({
    name: "User",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token,
                state.user = action.payload.user
        },
        updateUserData: (state, action) => {
                state.user = action.payload
        },
        logout: (state, action) => {
            state.token = null,
                state.user = null
        }
    }
})

export const { login, logout, updateUserData } = userSlice.actions;
export default userSlice.reducer;