import _ from "lodash"

import BuyerHome from "../components/pages/Home"
import SellerHome from "../components/pages/seller/Home"
import UserProfile from "../components/pages/UserProfile"
import Login from "../components/pages/Login"
import Signup from "../components/pages/Signup"
import RequireAuth from "../components/common/RequireAuth"
import PageNotFound from "../components/pages/PageNotFound"
import ViewProduct from "../components/pages/ViewProduct"

export const allRoutes = [
  {
    route: "Home",
    name: "home",
    path: "/",
  },
  {
    route: "Profile",
    name: "profile",
    path: "/profile",
  },
  {
    route: "Logout",
    name: "logout",
    path: "/",
  },
  {
    route: "Login",
    name: "login",
    path: "/login",
  },
  {
    route: "Signup",
    name: "signup",
    path: "/signup",
  },
]

export const navRoutes = {
  auth: {
    buyer: {
      home: {
        read: true,
      },
      profile: {
        read: true,
      },
      logout: {
        read: true,
      },
    },
    seller: {
      home: {
        read: true,
      },
      profile: {
        read: true,
      },
      logout: {
        read: true,
      },
    },
  },
  noAuth: {
    home: {
      read: true,
    },
    login: {
      read: true,
    },
    signup: {
      read: true,
    },
  },
}

export const isDisplayRoute = (auth, role, name) => {
  let key = auth ? `auth.${role}.${name}` : `noAuth.${name}`
  key += ".read"
  return _.get(navRoutes, key, false)
}

export const routesArr = {
  auth: {
    buyer: [
      {
        path: "/",
        element: <BuyerHome />,
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        ),
      },
      {
        path: "/product/:productId",
        element: <ViewProduct />
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
    seller: [
      {
        path: "/",
        element: <SellerHome />,
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <UserProfile />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  noAuth: [
    {
      path: "/",
      element: <BuyerHome />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/product/:productId",
      element: <ViewProduct />
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ],
}

export const renderRoutes = (auth, role) => {
  const key = auth ? `auth.${role}` : `noAuth`
  return _.get(routesArr, key, false)
}
