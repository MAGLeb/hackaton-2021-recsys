import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchCreatedRecommendationsFailure,
  fetchCreatedRecommendationsRequest,
  fetchCreatedRecommendationsSuccess,
} from "../slices/created-recommendations";
import { RootEpic } from "../types";
import { IBook } from "../../types/common";
import { fetchRecommendationsRequest } from "../slices";
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const loadCreatedRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchCreatedRecommendationsRequest.match),
    switchMap((action) => {
      return ajax({
        url: `${BACKEND_URL}/recommendations?book_ids=${action.payload.join(
          ","
        )}&model_name=item_similarity`,
        method: "GET",
        responseType: "text",
      }).pipe(
        map((value) => {
          return fetchCreatedRecommendationsSuccess(
            JSON.parse((value as any)?.response.replace(/\bNaN\b/g, "null"))
          );
        }),
        catchError(() => {
          errorNotification();
          return of(fetchCreatedRecommendationsFailure());
        })
      );
    })
  );
};

export const clearCreatedRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchRecommendationsRequest.match),
    map(() =>
      fetchCreatedRecommendationsSuccess({ recommendations: [], history: [] })
    )
  );
};
