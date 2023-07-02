export enum PostActionTypes {
  GET_POSTS_BY_USER_ID = "GET_POSTS_BY_USER_ID",
  GET_POSTS_BY_USER_ID_SUCCESS = "GET_POSTS_BY_USER_ID_SUCCESS",
  GET_POSTS_BY_USER_ID_ERROR = "GET_POSTS_BY_USER_ID_ERROR",
}

export const fetchUserPostsById = (data: any) => {
  return {
    type: PostActionTypes.GET_POSTS_BY_USER_ID,
    state: "GET_POSTS_BY_USER_ID",
    response: data,
  };
};

export const fetchUserPostsByIdSuccess = (data: any) => {
  return {
    type: PostActionTypes.GET_POSTS_BY_USER_ID_SUCCESS,
    state: "GET_POSTS_BY_USER_ID_SUCCESS",
    response: data,
  };
};

export const fetchUserPostsByIdError = (data: any) => {
  return {
    type: PostActionTypes.GET_POSTS_BY_USER_ID_ERROR,
    state: "GET_POSTS_BY_USER_ID_ERROR",
    response: { error: data, success: false },
  };
};
