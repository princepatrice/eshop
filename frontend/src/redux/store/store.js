import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import cardSlice from "../slices/cardSlice"
import  userSlice from "../slices/userSlice"

const rootReducer = combineReducers({
    card: cardSlice,
    user: userSlice
})

const persistenceConfig = {
    key: "root",
    storage
}

const persistedReducer = persistReducer(persistenceConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

const persistor = persistStore(store)

export { persistor, store }