import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchRecommendationsFailure,
  fetchRecommendationsRequest,
  fetchRecommendationsSuccess,
} from "../slices/recommendations";
import { RootEpic } from "../types";
import { ContentMode, IBook } from "../../types/common";
import { fetchPopularRequest, setContentMode } from "../slices";
import { NO_HISTORY } from "../../constants";
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const loadRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchRecommendationsRequest.match),
    switchMap((action) => {
      if (action.payload === NO_HISTORY) {
        return of(setContentMode(ContentMode.populdar));
      }
      const currentModel = state$.value.model.currentModel;
      let url = `${BACKEND_URL}/recommendations?model_name=${currentModel}`;
      if (Array.isArray(action.payload)) {
        url += `&book_ids=${action.payload.join(",")}`;
      } else {
        url += `&user_id=${action.payload}`;
      }

      return ajax({
        url,
        method: "GET",
        responseType: "text",
      }).pipe(
        switchMap((value) => {
          const response = JSON.parse(
            (value as any)?.response.replace(/\bNaN\b/g, "null")
          );
          if (response?.history?.length) {
            return of(
              setContentMode(ContentMode.recommendations),
              fetchRecommendationsSuccess(response)
            );
          } else {
            return of(setContentMode(ContentMode.populdar));
          }
        }),
        catchError(() => {
          errorNotification();
          return of(fetchRecommendationsFailure());
        })
      );
    })
  );
};

export const finishLoadRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchPopularRequest.match),
    map(() => fetchRecommendationsSuccess({ history: [], recommendations: [] }))
  );
};
