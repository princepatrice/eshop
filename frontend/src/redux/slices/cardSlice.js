import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cardItems: {

    }
}

const cardItemSlice = createSlice({
    name: "Card",
    initialState: initialState,
    reducers: {
       
        addCardItem: (state, action) => {
            const newItem = action.payload.data
            if (action.payload.userId in state.cardItems) {
                let myCardItem = state.cardItems[action.payload.userId]
                const product = myCardItem.find((prod) => prod.id === newItem.id)
                if (product) {
                    const newFilteredItems = myCardItem.map((prod) => {
                        if (prod.id === newItem.id) {
                            prod.quantity = Number(prod.quantity)+Number(action.payload.quantity)
                        }
                        return prod
                    })
                    state.cardItems[action.payload.userId] = [...newFilteredItems]
                } else {
                    state.cardItems[action.payload.userId] = [...myCardItem,
                    { id: newItem?.id, price:Number( newItem?.price), quantity: Number(action.payload.quantity), name:newItem?.name }]
                }

            } else {
                state.cardItems[action.payload.userId] = [  { id: newItem?.id, price:Number( newItem?.price), quantity: Number(action.payload.quantity), name:newItem?.name }]
            }
        },
        deleteCardItem: (state, action) => {
            state.cardItems[action.payload.userId] = [...state.cardItems[action.payload.userId].filter((prod) => prod.id !== action.payload.id)]
        },
        updateCardItem: (state, action) => {

        },
        emptyCard: (state, action) => {
            state.cardItems[action.payload.userId] = []
        }
    }
})

export const { addCardItem, deleteCardItem, updateCardItem, emptyCard } = cardItemSlice.actions;
export default cardItemSlice.reducer;