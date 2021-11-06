import os
import pandas as pd

from backend.core.factory import ModelFactory
from backend.core.database import Database
from backend.utils.utils import project_path
from backend.utils.mean_average_precision import mean_average_precision_k

PROJECT_PATH = project_path()


def predict_test_data():
    """ Script to get predictions for test data."""
    database = Database()
    model_similarity = ModelFactory.create('item_similarity', database)
    model_random = ModelFactory.create('random', database)
    test_data = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'validation', 'test_interactions.csv'))
    test_ids = test_data['user_id'].values.tolist()
    test_target = test_data.loc[:, test_data.columns[1:]].values.tolist()
    predictions_similarity = []
    predictions_random = []

    for index, user_id in enumerate(test_ids):
        ids_similarity = model_similarity.predict(user_id)
        predictions_similarity.append(ids_similarity)
        ids_random = model_random.predict(user_id)
        predictions_random.append(ids_random)

    metric = mean_average_precision_k(predictions_similarity, test_target)
    print("similarity: ", metric)
    metric = mean_average_precision_k(predictions_random, test_target)
    print("random: ", metric)
    return metric


if __name__ == '__main__':
    predict_test_data()
