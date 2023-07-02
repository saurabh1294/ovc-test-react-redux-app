import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      // Define your initial store state if needed
    });
  });

  test('renders UsersList component on the root path', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const usersList = getByTestId('users-list');
    expect(usersList).toBeInTheDocument();
  });

  test('renders UserPosts component on the /user-posts path', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/user-posts']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const userPosts = getByTestId('user-posts');
    expect(userPosts).toBeInTheDocument();
  });
});
