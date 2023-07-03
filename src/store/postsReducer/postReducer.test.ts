import { postsReducer, UserPostsState } from "./postsReducer";
import { PostActionTypes } from "./postsActions";

describe("postsReducer", () => {
  const initialState: UserPostsState = {
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

  test("should handle GET_POSTS_BY_USER_ID action type", () => {
    const action = {
      type: PostActionTypes.GET_POSTS_BY_USER_ID,
    };

    const newState = postsReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.failed).toBe(false);
    expect(newState.postsDetails).toEqual(initialState.postsDetails);
  });

  test("should handle GET_POSTS_BY_USER_ID_SUCCESS action type", () => {
    const testData = [
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
    ];

    const action = {
      type: PostActionTypes.GET_POSTS_BY_USER_ID_SUCCESS,
      response: testData,
    };

    const newState = postsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.failed).toBe(false);
    expect(newState.postsDetails).toEqual(testData);
  });

  test("should handle GET_POSTS_BY_USER_ID_ERROR action type", () => {
    const testData = [
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
    ];

    const action = {
      type: PostActionTypes.GET_POSTS_BY_USER_ID_ERROR,
      response: testData,
    };

    const newState = postsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.failed).toBe(true);
    expect(newState.postsDetails).toEqual(testData);
  });

  test("should return the initial state for unknown action types", () => {
    const action = {
      type: "UNKNOWN_ACTION_TYPE",
    };

    const newState = postsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
