from typing import List

from turicreate.data_structures.sframe import SFrame

from backend.core.models.model import Model


class Random(Model):
    """
    Recommendation model. Predict random ids of books.
    """
    MODEL_PATH = 'random/'

    def __init__(self, database):
        super().__init__(self.MODEL_PATH, database)

    def train(self, item_data: SFrame):
        pass

    def predict(self, user_id: int) -> List:
        predictions = self._database.random_books_ids()
        return predictions

    def load(self):
        pass

    def save(self):
        pass
