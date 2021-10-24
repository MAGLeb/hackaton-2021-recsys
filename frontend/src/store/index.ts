import { AnyAction, configureStore } from "@reduxjs/toolkit";
import reducer from "./root-reducer";
import { RootState } from "./types";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

export const store = configureStore({
  reducer,
  middleware: [epicMiddleware],
});

epicMiddleware.run(rootEpic);
