export enum UserActionTypes {
  GET_USERS = "GET_USERS",
  GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
  GET_USERS_ERROR = "GET_USERS_ERROR",
}

export const fetchUsers = (data: any) => {
  return {
    type: UserActionTypes.GET_USERS,
    state: "GET_USERS",
    response: data,
  };
};

export const fetchUsersSuccess = (data: any) => {
  return {
    type: UserActionTypes.GET_USERS_SUCCESS,
    state: "GET_USERS_SUCCESS",
    response: data,
  };
};

export const fetchUsersError = (data: any) => {
  return {
    type: UserActionTypes.GET_USERS_ERROR,
    state: "GET_USERS_ERROR",
    response: { error: data, success: false },
  };
};
