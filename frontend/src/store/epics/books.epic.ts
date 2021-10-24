import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of, delay } from "rxjs";
import {
  fetchBooksFailure,
  fetchBooksRequest,
  fetchBooksSuccess,
} from "../slices/books";
import { RootEpic } from "../types";
import { ajax } from "rxjs/ajax";
import { errorNotification } from "../../utils";
import { BACKEND_URL } from "../../constants";

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() => fetchBooksRequest())
  );
};

export const loadBooks: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchBooksRequest.match),
    switchMap(() => {
      return ajax.get<{ ids: number[] }>(`${BACKEND_URL}/books`).pipe(
        map((value) => fetchBooksSuccess(value?.response)),
        catchError(() => {
          errorNotification();
          return of(fetchBooksFailure());
        })
      );
    })
  );
};
