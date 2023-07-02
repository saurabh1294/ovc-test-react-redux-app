import {
    fetchUserPostsById,
    fetchUserPostsByIdSuccess,
    fetchUserPostsByIdError,
    PostActionTypes,
  } from './postsActions';
  
  describe('Post Actions', () => {
    const testData = { /* Define your test data here */ };
  
    test('fetchUserPostsById should create an action to get posts by user ID', () => {
      const expectedAction = {
        type: PostActionTypes.GET_POSTS_BY_USER_ID,
        state: 'GET_POSTS_BY_USER_ID',
        response: testData,
      };
      expect(fetchUserPostsById(testData)).toEqual(expectedAction);
    });
  
    test('fetchUserPostsByIdSuccess should create an action for successful retrieval of posts by user ID', () => {
      const expectedAction = {
        type: PostActionTypes.GET_POSTS_BY_USER_ID_SUCCESS,
        state: 'GET_POSTS_BY_USER_ID_SUCCESS',
        response: testData,
      };
      expect(fetchUserPostsByIdSuccess(testData)).toEqual(expectedAction);
    });
  
    test('fetchUserPostsByIdError should create an action for an error while retrieving posts by user ID', () => {
      const expectedAction = {
        type: PostActionTypes.GET_POSTS_BY_USER_ID_ERROR,
        state: 'GET_POSTS_BY_USER_ID_ERROR',
        response: { error: testData, success: false },
      };
      expect(fetchUserPostsByIdError(testData)).toEqual(expectedAction);
    });
  });
  