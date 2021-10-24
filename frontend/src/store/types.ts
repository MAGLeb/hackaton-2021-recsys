import reducer from "./root-reducer";
import { AnyAction } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";

export type RootState = ReturnType<typeof reducer>;
export type RootEpic = Epic<AnyAction, AnyAction, RootState>;
