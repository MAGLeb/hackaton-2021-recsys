import { combineEpics } from "redux-observable";
import * as users from "./users.epic";
import * as recommensations from "./recommendations.epic";
import * as popular from "./popular.epic";
import * as books from "./books.epic";
import * as target from "./target.epic";
import * as genres from "./genres.epic";
import * as filteredBooks from "./filtered-books";
import * as createdRecommendations from "./created-recommendations";

const rootEpic = combineEpics(
  ...Object.values(users),
  ...Object.values(recommensations),
  ...Object.values(popular),
  ...Object.values(books),
  ...Object.values(target),
  ...Object.values(genres),
  ...Object.values(filteredBooks),
  ...Object.values(createdRecommendations)
);

export default rootEpic;
