import { usersReducer, UserState } from './usersReducer';
import { UserActionTypes } from './usersActions';

describe('usersReducer', () => {
  const initialState: UserState = {
    isLoading: false,
    failed: false,
    users: [
      {
        id: 1,
        name: '',
        username: '',
        email: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        phone: '',
        website: '',
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      },
    ],
  };

  test('should handle GET_USERS action type', () => {
    const action = {
      type: UserActionTypes.GET_USERS,
    };

    const newState = usersReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.failed).toBe(false);
    expect(newState.users).toEqual([]);
  });

  test('should handle GET_USERS_SUCCESS action type', () => {
    const testData = [{ /* Define your test data here */ }];

    const action = {
      type: UserActionTypes.GET_USERS_SUCCESS,
      response: testData,
    };

    const newState = usersReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.failed).toBe(false);
    expect(newState.users).toEqual(testData);
  });

  test('should handle GET_USERS_ERROR action type', () => {
    const testData = { /* Define your test data here */ };

    const action = {
      type: UserActionTypes.GET_USERS_ERROR,
      response: testData,
    };

    const newState = usersReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.failed).toBe(true);
    expect(newState.users).toEqual(testData);
  });

  test('should return the initial state for unknown action types', () => {
    const action = {
      type: 'UNKNOWN_ACTION_TYPE',
    };

    const newState = usersReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
