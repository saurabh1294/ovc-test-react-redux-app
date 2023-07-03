import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
  UserActionTypes,
} from "./usersActions";

describe("User Actions", () => {
  const testData = {
    /* Define your test data here if needed */
  };

  test("fetchUsers should create an action to get users", () => {
    const expectedAction = {
      type: UserActionTypes.GET_USERS,
      state: "GET_USERS",
      response: testData,
    };
    expect(fetchUsers(testData)).toEqual(expectedAction);
  });

  test("fetchUsersSuccess should create an action for successful retrieval of users", () => {
    const expectedAction = {
      type: UserActionTypes.GET_USERS_SUCCESS,
      state: "GET_USERS_SUCCESS",
      response: testData,
    };
    expect(fetchUsersSuccess(testData)).toEqual(expectedAction);
  });

  test("fetchUsersError should create an action for an error while retrieving users", () => {
    const expectedAction = {
      type: UserActionTypes.GET_USERS_ERROR,
      state: "GET_USERS_ERROR",
      response: { error: testData, success: false },
    };
    expect(fetchUsersError(testData)).toEqual(expectedAction);
  });
});
