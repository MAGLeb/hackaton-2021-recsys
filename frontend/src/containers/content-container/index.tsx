import React, { useEffect, useState } from "react";
import styles from "./index.module.sass";
import { PageHeader } from "../../components/page-header";
import { useHistory, useLocation } from "react-router-dom";
import { RecommendationsContainer } from "../recommendations-container";
import {
  selectContentMode,
  selectIsLoadingContent,
  selectIsLoadingUsers,
  selectUsersIds,
} from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { ContentMode } from "../../types/common";
import { PopularContainer } from "../popular-container";
import { fetchRecommendationsRequest } from "../../store/slices";
import { NO_HISTORY, USER_PARAM } from "../../constants";
import { Skeleton } from "antd";
import { TargetContainer } from "../target-container";
import { UserSelect } from "../../components/user-select";
import { RecommendationsCreatorContainer } from "../recommendations-creator-container";
import { NotFoundComponent } from "../../components/not-found-component";

export const ContentContainer = () => {
  const contentMode = useSelector(selectContentMode);
  const isLoading = useSelector(selectIsLoadingContent);
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<number | undefined>(undefined);
  const userIds = useSelector(selectUsersIds);
  const isLoadingUsers = useSelector(selectIsLoadingUsers);

  const history = useHistory();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const currentUser = urlSearchParams.get(USER_PARAM) || undefined;
    setCurrentUser(
      currentUser ? Number(currentUser) : (currentUser as undefined)
    );
    dispatch(fetchRecommendationsRequest(currentUser || NO_HISTORY));
  }, [location]);

  const onPredict = (user: number | undefined) => {
    if (!user) {
      const urlSearchParams = new URLSearchParams(location.search);
      urlSearchParams.delete(USER_PARAM);
      history.push({ search: urlSearchParams.toString() });
    } else {
      const search = new URLSearchParams({
        [USER_PARAM]: user.toString(),
      }).toString();
      history.push({
        search,
      });
    }
  };

  const getContent = () => {
    if (isLoading || isLoadingUsers) {
      return (
        <React.Fragment>
          {[...Array(3).keys()].map((item, inx) => (
            <Skeleton key={inx} active className={styles.skeleton} />
          ))}
        </React.Fragment>
      );
    }
    if (!userIds.includes(currentUser as number) && currentUser) {
      return <NotFoundComponent />;
    }
    if (contentMode === ContentMode.populdar) {
      return (
        <React.Fragment>
          <RecommendationsCreatorContainer />
          <PopularContainer />
        </React.Fragment>
      );
    }
    if (contentMode === ContentMode.recommendations) {
      return (
        <React.Fragment>
          <TargetContainer />
          <RecommendationsContainer />
        </React.Fragment>
      );
    }
    return null;
  };
  return (
    <div className={styles.content}>
      <PageHeader />
      <UserSelect
        isLoadingUsers={isLoadingUsers}
        onPredict={onPredict}
        value={currentUser}
      />
      {getContent()}
    </div>
  );
};
