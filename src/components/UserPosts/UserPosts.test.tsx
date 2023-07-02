import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import UserPosts from "./UserPosts";
import { useDispatch, useSelector } from "react-redux";

jest.mock("axios");
jest.mock("react-redux");

describe("UserPosts", () => {
  const mockedDispatch = jest.fn();
  const mockedUseSelector = useSelector as jest.Mock;
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        postsReducder: {
          isLoading: false,
          postDetails: [
            { id: 1, title: "Post 1", body: "Body 1" },
            { id: 2, title: "Post 2", body: "Body 2" },
          ],
        },
      })
    );
    useDispatch.mockReturnValue(mockedDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders user posts correctly when data is available", async () => {
    render(<UserPosts />);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.queryByText("No posts Available")).not.toBeInTheDocument();

    expect(screen.getByText("Showing 1-5 of 2 records")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  test("renders error message when no posts available", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        postsReducder: {
          isLoading: false,
          postDetails: [],
        },
      })
    );

    render(<UserPosts />);

    expect(screen.getByText("No posts Available")).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Showing 1-5 of 2 records")).not.toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  test("displays loading spinner while loading", async () => {
    mockedUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        postsReducder: {
          isLoading: true,
          postDetails: [],
        },
      })
    );

    render(<UserPosts />);

    expect(screen.getByLabelText("Loading Spinner")).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
    expect(screen.queryByText("No posts Available")).not.toBeInTheDocument();
    expect(screen.queryByText("Showing 1-5 of 2 records")).not.toBeInTheDocument();
    expect(screen.queryByText("Back")).not.toBeInTheDocument();
  });

  test("navigates back when the 'Back' button is clicked", async () => {
    const mockNavigate = jest.fn();
    const mockLocation = { state: { userId: 123 } };
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
      useLocation: () => mockLocation,
    }));

    render(<UserPosts />);

    fireEvent.click(screen.getByText("Back"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("fetches user posts on component mount", async () => {
    const mockResponse = {
      data: [{ id: 1, title: "Post 1", body: "Body 1" }],
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    render(<UserPosts />);

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith(
        fetchUserPostsByIdSuccess(mockResponse.data)
      );
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Body 1")).toBeInTheDocument();
    });
  });

  test("handles error when fetching user posts", async () => {
    const mockError = new Error("API Error");
    mockedAxios.get.mockRejectedValueOnce(mockError);

    render(<UserPosts />);

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith(
        fetchUserPostsByIdError(mockError)
      );
      expect(screen.getByText("Some error invoking the API for the search filter")).toBeInTheDocument();
    });
  });
});
