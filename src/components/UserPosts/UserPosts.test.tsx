import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../../store/rootReducer";
import UserPosts from "./UserPosts";

jest.mock("axios");

describe("UserPosts", () => {
  const mockUserPosts = [
    { id: 1, title: "Post 1", body: "Body 1" },
    { id: 2, title: "Post 2", body: "Body 2" },
  ];

  let store;

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUserPosts });
    store = createStore(rootReducer, applyMiddleware(thunk));
  });

  it("renders user posts and displays back button", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserPosts />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("UsersPosts")).toBeInTheDocument();
      expect(screen.getByTestId("backButton")).toBeInTheDocument();
    });

    // Can add more tests
  });
});
