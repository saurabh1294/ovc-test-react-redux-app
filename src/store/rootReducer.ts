import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer/usersReducer";
import { postsReducer } from "./postsReducer/postsReducer";

const rootReducer = combineReducers({
  usersReducer,
  postsReducer,
});

export default rootReducer;
