
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const contactsPersistConfig = {
	key: "contacts",
	storage,
	whitelist: ["items"],
};

const persistedContactsReducer = persistReducer(
	contactsPersistConfig,
	contactsReducer
);

export const store = configureStore({
	reducer: {
		contacts: persistedContactsReducer,
		filters: filtersReducer,
	},
});

export const persistor = persistStore(store);