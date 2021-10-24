import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchGenresFailure,
  fetchGenresRequest,
  fetchGenresSuccess,
} from "../slices/genres";
import { RootEpic } from "../types";
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() => fetchGenresRequest())
  );
};
export const loadGenres: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchGenresRequest.match),
    switchMap((action) => {
      return ajax.get<{ rubrics: string[] }>(`${BACKEND_URL}/rubrics`).pipe(
        map((value) => fetchGenresSuccess(value?.response)),
        catchError(() => {
          errorNotification();
          return of(fetchGenresFailure());
        })
      );
    })
  );
};
