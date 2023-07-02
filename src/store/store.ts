import { legacy_createStore as createStore, applyMiddleware } from "redux";

// Import thunk middleware
import thunk from "redux-thunk";

// Import all reducers created
import rootReducer from "./rootReducer";

export const store = createStore(rootReducer, {}, applyMiddleware(thunk));
