import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import Routess from "./Routes";
import { ErrorBoundary } from "react-error-boundary";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Fallback from "./component/Fallback";

const errorHandler = (error, errorInfo) => {
  console.log("logging", error, errorInfo);
};

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
      <Routess />
    </ErrorBoundary>,
    rootElement
  );
} else {
  render(
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
      <Routess />
    </ErrorBoundary>,
    rootElement
  );
}
