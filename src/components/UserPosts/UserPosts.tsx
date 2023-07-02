import axios from "axios";
import React, { useEffect, useState, CSSProperties } from "react";
// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "../../common/index.module.scss";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import {
  fetchUserPostsById,
  fetchUserPostsByIdSuccess,
  fetchUserPostsByIdError,
} from "../../store/postsReducer/postsActions";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ClipLoader from "react-spinners/ClipLoader";
import Button from "react-bootstrap/Button";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function UserPosts(props: any) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [numRows, setNumRows] = useState(0);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const { userId } = location.state;

  const isLoading =
    useSelector((state: any) => {
      return state?.postsReducder?.isLoading;
    }) || false;

  const postDetails = useSelector((state: any) => {
    return state?.postsReducder?.postDetails;
  });

  const columns = [
    {
      dataField: "title",
      text: "Title",
      sort: true,
    },

    {
      dataField: "body",
      text: "Body",
      sort: true,
    },
  ];

  useEffect(() => {
    fetchUsersPosts();
  }, []);

  //   useEffect(() => {
  //     setUserPosts(postDetails);
  //   }, [isLoading]);

  const goBack = () => {
    navigate(-1);
  };

  const fetchUsersPosts = async () => {
    try {
      dispatch(fetchUserPostsById(null));

      const apiUrl = `${process.env.REACT_APP_POSTS_BASE_URL}?userId=${userId}`;

      await axios.get(apiUrl).then((res) => {
        if (res.data?.length === 0) {
          setError("No posts Available");
        } else {
          setError("");
          setNumRows(res?.data?.length);
        }
        dispatch(fetchUserPostsByIdSuccess(res.data));
        setNumRows(res?.data?.length);
        setUserPosts(res?.data);
      });
    } catch (e) {
      console.log("Error invoking customer list API", e);
      setError("Some error invoking the API for the search filter");
      dispatch(fetchUserPostsByIdError(e));
    }
  };

  if (!isLoading) {
    return (
      <div className="UsersPosts">
        <span className={`${styles.Error} mb-2`}>{error}</span>
        <br />
        <br />
        {
          <span className="mb-5 mt-1">{`Showing 1-5 of ${numRows} records`}</span>
        }
        <BootstrapTable
          bootstrap4
          keyField="id"
          data={postDetails || userPosts}
          columns={columns}
          pagination={paginationFactory({ sizePerPage: 5 })}
        />
        {<span className="mb-5">{`Showing 1-5 of ${numRows} records`}</span>}

        <Button
          variant="secondary"
          className="mt-5"
          type="button"
          onClick={goBack}
        >
          Back
        </Button>
      </div>
    );
  } else {
    return (
      <ClipLoader
        color={"#ffffff"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
}
