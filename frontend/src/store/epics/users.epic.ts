import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../slices/users";
import { RootEpic } from "../types";
import { errorNotification } from "../../utils";
import { BACKEND_URL } from "../../constants";

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() => fetchUsersRequest())
  );
};

export const loadUsers: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchUsersRequest.match),
    switchMap(() => {
      return ajax.get<{ ids: number[] }>(`${BACKEND_URL}/users`).pipe(
        map((value) => fetchUsersSuccess(value?.response)),
        catchError(() => {
          errorNotification();
          return of(fetchUsersFailure());
        })
      );
    })
  );
};
