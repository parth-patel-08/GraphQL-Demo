import React, { Suspense, useEffect } from "react"
import { useSelector } from "react-redux"
import { useRoutes } from "react-router-dom"
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"

import ErrorBoundary from "./components/common/ErrorBoundary"
import Spinner from "./components/common/Spinner"
import "./app.css"
import { renderRoutes } from "./utils/routes"

const headersLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("shopUserToken")

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const httpLink = new HttpLink({
  uri: "http://localhost:4000/"
})

const errorLink = onError(({ networkError }) => {
  if (networkError?.statusCode === 401) {
    localStorage.removeItem("shopUserToken")
    window.location.href = "/login"
  }
})

const client = new ApolloClient({
  link: headersLink.concat(from([errorLink, httpLink])),
  cache: new InMemoryCache(),
})

function App() {
  const user = useSelector((state) => state.user)
  const routesArr = renderRoutes(user.isLogin, user.role)
  const routes = useRoutes(routesArr)

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </ApolloProvider>
    </ErrorBoundary>
  )
}

export default App
