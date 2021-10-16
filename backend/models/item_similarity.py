import os
from typing import List

from turicreate import load_model
from turicreate.data_structures.sframe import SFrame
from turicreate.toolkits.recommender.item_content_recommender import create

from backend.models.model import Model


class ItemSimilarity(Model):
    """
    Recommendation model imported from Apple framework 'Turicreate'.
    https://github.com/apple/turicreate
    """
    MODEL_PATH = 'item_similarity/'

    def __init__(self):
        super().__init__(self.MODEL_PATH)

    def train(self, item_data: SFrame):
        self._model = create(item_data=item_data, item_id='book_id', verbose=True, max_item_neighborhood_size=32)

    def predict(self, user_id: int) -> List:
        history_user = get_history_user(user_id)
        predictions = self._model.recommend_from_interactions(observed_items=history_user, k=1)

        return list(predictions['book_id'])

    def load(self):
        if os.path.exists(self._local_model_path):
            self._model = load_model(self._local_model_path)
