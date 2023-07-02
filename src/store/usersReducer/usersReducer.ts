import { UserActionTypes } from "./usersActions";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface UserState {
  isLoading: boolean;
  failed: boolean;
  users: User[];
}

const initialOrderState: UserState = {
  isLoading: false,
  failed: false,
  users: [
    {
      id: 1,
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    },
  ],
};

/**
 * Counter Reducer
 */
export const usersReducer = (state: any = initialOrderState, action: any) => {
  switch (action.type) {
    case UserActionTypes.GET_USERS:
      return {
        ...state,
        users: [],
        isLoading: true,
        failed: false,
      };

    case UserActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action?.response,
        isLoading: false,
        failed: false,
      };

    case UserActionTypes.GET_USERS_ERROR:
      return {
        ...state,
        users: action?.response,
        isLoading: false,
        failed: true,
      };

    default:
      return state;
  }
};
