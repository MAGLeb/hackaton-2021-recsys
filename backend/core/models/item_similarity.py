import os
from typing import List

from turicreate import SFrame, load_model
from turicreate.toolkits.recommender.item_similarity_recommender import create

from backend.core.models.model import Model


class ItemSimilarity(Model):
    """
    Recommendation model imported from Apple framework 'Turicreate'.
    https://github.com/apple/turicreate

    Find the most similar (the nearest) book to the book for which you want to predict.
    """
    MODEL_PATH = 'data/models/item_similarity/'

    def __init__(self, database):
        super().__init__(self.MODEL_PATH, database)

    def train(self):
        data = self._database.interactions
        data.drop(inplace=True, columns=['dt'], axis=1)
        data = SFrame(data)

        self._model = create(observation_data=data, user_id='user_id', item_id='book_id',
                             verbose=True, seed_item_set_size=0)

    def predict(self, user_id: int, books_ids: list = None) -> List:
        if self._model is None:
            self.load()

        predictions = self._model.recommend(users=[user_id], k=25, exclude_known=True, random_seed=42)

        return list(predictions['book_id'])

    def load(self):
        if os.path.exists(self._local_model_path):
            self._model = load_model(self._local_model_path)

    def save(self):
        self._model.save(self._local_model_path)
