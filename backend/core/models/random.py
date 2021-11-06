from typing import List

from turicreate.data_structures.sframe import SFrame

from backend.core.models.model import Model
from backend.utils.utils import NUMBER_ITEMS_TO_RETURN


class Random(Model):
    """
    Recommendation model. Predict random ids of books.
    """
    MODEL_PATH = 'random/'

    def __init__(self, database):
        super().__init__(self.MODEL_PATH, database)

    def train(self, item_data: SFrame):
        pass

    def predict(self, user_id: int, books_ids: list = None, k: int = NUMBER_ITEMS_TO_RETURN) -> List:
        predictions = self._database.random_books_ids(k)
        predictions = list(map(int, predictions))
        return predictions

    def load(self):
        pass

    def save(self):
        pass
