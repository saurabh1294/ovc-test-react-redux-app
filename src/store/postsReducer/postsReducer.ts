import { PostActionTypes } from "./postsActions";

export interface UserPostsDetails {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface UserPostsState {
  isLoading: boolean;
  failed: boolean;
  postsDetails: UserPostsDetails[];
}

const initialOrderState: UserPostsState = {
  isLoading: false,
  failed: false,
  postsDetails: [
    {
      userId: 1,
      id: 1,
      title: "test1 title",
      body: "test1 body",
    },
    {
      userId: 1,
      id: 2,
      title: "test2 title",
      body: "test2 body",
    },
  ],
};

/**
 * Counter Reducer
 */
export const postsReducer = (state: any = initialOrderState, action: any) => {
  switch (action.type) {
    case PostActionTypes.GET_POSTS_BY_USER_ID:
      return {
        ...state,
        postDetails: [],
        isLoading: true,
        failed: false,
      };

    case PostActionTypes.GET_POSTS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        postDetails: action?.response,
        isLoading: false,
        failed: false,
      };

    case PostActionTypes.GET_POSTS_BY_USER_ID_ERROR:
      return {
        ...state,
        postDetails: action?.response,
        isLoading: false,
        failed: true,
      };

    default:
      return state;
  }
};
