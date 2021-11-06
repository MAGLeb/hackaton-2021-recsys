import os
import pandas as pd

from backend.core.factory import ModelFactory
from backend.core.database import Database
from backend.utils.utils import project_path

PROJECT_PATH = project_path()


def predict_test_data():
    """ Script to get predictions for test data."""
    database = Database()
    model_similarity = ModelFactory.create('item_similarity', database)
    test_ids = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'user_ids.csv'), encoding='cp1251')['user_id'].tolist()
    test_ids = list(set(test_ids))

    with open('../../data/results.csv', 'w') as file:
        file.write(','.join(['user_id', 'book_id_1', 'book_id_2', 'book_id_3', 'book_id_4', 'book_id_5']))
        for i, user_id in enumerate(test_ids):
            file.write('\n')
            predictions = model_similarity.predict(user_id, k=5)
            predictions = [user_id] + predictions
            file.write(','.join(list(map(str, predictions))))

        file.close()


if __name__ == '__main__':
    predict_test_data()
