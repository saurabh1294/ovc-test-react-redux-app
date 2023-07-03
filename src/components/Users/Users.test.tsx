import { render, screen, fireEvent, act } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import UsersList from "./Users";

jest.mock("axios");

describe("UsersList", () => {
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({
      usersReducer: {
        isLoading: false,
        users: [],
      },
    });
  });

  it("should render the component", () => {
    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    expect(screen.getByText("Fetch Users")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search User")).toBeInTheDocument();
  });

  it('should fetch users when the "Fetch Users" button is clicked', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    await act(async () => {
      fireEvent.click(screen.getByText("Fetch Users"));
    });

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      process.env.REACT_APP_USERS_BASE_URL
    );

    // You can add additional assertions for the loading spinner or other UI changes
  });

  it("should filter users when a search input is entered", () => {
    const users = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        address: { city: "New York" },
        company: { name: "ABC Corp" },
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        address: { city: "Los Angeles" },
        company: { name: "XYZ Inc" },
      },
    ];

    store = mockStore({
      usersReducer: {
        isLoading: false,
        users: users,
      },
    });

    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );

    act(() => {
      fireEvent.change(screen.getByPlaceholderText("Search User"), {
        target: { value: "John" },
      });
    });

    expect(screen.queryByText("Jane Smith")).toBeNull();
  });

  // Add more test cases for different scenarios such as displaying users, handling errors, etc.
});
