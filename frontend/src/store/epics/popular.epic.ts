import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchPopularFailure,
  fetchPopularRequest,
  fetchPopularSuccess,
} from "../slices/popular";
import { RootEpic } from "../types";
import { ContentMode, IBook } from "../../types/common";
import { setContentMode } from "../slices/content-mode";
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const initLoadPopular: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(setContentMode.match),
    filter((action) => action.payload === ContentMode.populdar),
    map(() => fetchPopularRequest())
  );
};

export const loadPopular: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchPopularRequest.match),
    switchMap((action) => {
      return ajax({
        url: `${BACKEND_URL}/popular`,
        method: "GET",
        responseType: "text",
      }).pipe(
        map((value) => {
          return fetchPopularSuccess(
            JSON.parse((value as any)?.response.replace(/\bNaN\b/g, "null"))
          );
        }),
        catchError(() => {
          errorNotification();
          return of(fetchPopularFailure());
        })
      );
    })
  );
};
