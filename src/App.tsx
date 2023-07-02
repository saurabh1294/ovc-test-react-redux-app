import UsersList from "./components/Users/Users";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Container } from "react-bootstrap";

import { Routes, Route } from "react-router-dom";
import UserPosts from "./components/UserPosts/UserPosts";

export default function App() {
  return (
    <Provider store={store}>
      <Container fluid>
        <Routes>
          <Route path="/user-posts" element={<UserPosts />} />
          <Route path="/" element={<UsersList />} />
        </Routes>
      </Container>
    </Provider>
  );
}
