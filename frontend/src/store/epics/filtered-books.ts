import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchFilteredBooksFailure,
  fetchFilteredBooksRequest,
  fetchFilteredBooksSuccess,
} from "../slices/filtered-books";
import { RootEpic } from "../types";
import { IBook } from "../../types/common";
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const loadFilteredBooks: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchFilteredBooksRequest.match),
    switchMap((action) => {
      const { type, genres } = action.payload;
      return ajax({
        url: `${BACKEND_URL}/books_filter?type=${type}&rubrics=${genres.join(
          ","
        )}`,
        method: "GET",
        responseType: "text",
      }).pipe(
        map((value) => {
          return fetchFilteredBooksSuccess(
            JSON.parse((value as any)?.response.replace(/\bNaN\b/g, "null"))
          );
        }),
        catchError(() => {
          errorNotification();
          return of(fetchFilteredBooksFailure());
        })
      );
    })
  );
};
