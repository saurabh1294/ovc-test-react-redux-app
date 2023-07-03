import axios from "axios";
import React, { useEffect, useState, CSSProperties } from "react";
// Import hooks provided by react-redux
import { useSelector, useDispatch } from "react-redux";

import styles from "../../common/index.module.scss";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
} from "../../store/usersReducer/usersActions";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import ClipLoader from "react-spinners/ClipLoader";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function UsersList() {
  const [error, setError] = useState("");
  const [numRows, setNumRows] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();

  const isLoading =
    useSelector((state: any) => {
      return state?.usersReducer?.isLoading;
    }) || false;

  const users =
    useSelector((state: any) => {
      return state?.usersReducer?.users;
    }) || false;

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
      formatter: (value: any, row: any) => (
        <span>
          <Link to="/user-posts" state={{ userId: row?.id }}>
            {value}
          </Link>
        </span>
      ),
      sort: true,
    },
    {
      dataField: "address.city",
      text: "City",
      sort: true,
    },
    {
      dataField: "company.name",
      text: "Company",
      sort: true,
    },
  ];

  useEffect(() => {
    setFilteredUsers(users);
  }, [isLoading]);

  const searchUser = (event: any) => {
    setFilteredUsers(
      users.filter((item: any) => {
        const name = item?.name?.toLowerCase();
        return name?.includes(event.target.value?.toLowerCase());
      })
    );
  };

  const fetchUsersList = async () => {
    try {
      dispatch(fetchUsers(null));

      const apiUrl: string | any = process.env.REACT_APP_USERS_BASE_URL;
      await axios.get(apiUrl).then((res) => {
        if (res.data.length === 0) {
          setError("No users Available");
        } else {
          setError("");
          setNumRows(res?.data?.length);
        }
        dispatch(fetchUsersSuccess(res.data));
        setNumRows(res?.data?.length);
      });
    } catch (e) {
      console.log("Error invoking customer list API", e);
      setError("Some error invoking the API for the search filter");
      dispatch(fetchUsersError(e));
    }
  };

  if (!isLoading) {
    return (
      <div className="UsersList" data-testid="UsersList">
        <Row>
          <Col sm={2}>
            <Button
              variant="secondary"
              className="mt-5"
              type="button"
              onClick={fetchUsersList}
            >
              Fetch Users
            </Button>
          </Col>
          <Col sm={2} className="mt-5">
            <Form.Control
              type="text"
              onChange={(e: any) => searchUser(e)}
              placeholder={"Search User"}
            />
          </Col>
        </Row>
        <span className={`${styles.Error} mb-5`}>{error}</span>

        <br />
        <br />

        {numRows > 0 && (
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={filteredUsers}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 5 })}
          />
        )}
        {numRows > 0 && (
          <span className="mb-5">{`Showing 1-5 of ${numRows} records`}</span>
        )}
      </div>
    );
  } else {
    return (
      <>
        <Row>
          <Col sm={2}>
            <Button
              variant="secondary"
              className="mt-5"
              type="button"
              onClick={fetchUsersList}
            >
              Fetch Users
            </Button>
          </Col>
          <Col sm={2} className="mt-5">
            <Form.Control
              type="text"
              onChange={(e: any) => searchUser(e)}
              placeholder={"Search User"}
            />
          </Col>
        </Row>
        <ClipLoader
          color={"#ffffff"}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    );
  }
}
