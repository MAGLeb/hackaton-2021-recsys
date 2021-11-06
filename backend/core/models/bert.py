import os
import pickle
from typing import List

import torch
import numpy as np
from transformers import AutoModelForSequenceClassification

from backend.core.models.model import Model


class Bert(Model):
    """
    BERT-based model for book prediction
    This model based on BERT. The task of the model is to predict
    whether the book was ordered by the user.
    Last 4 books from the user history are concatenated with a new book, and
    the model predicts whether the book is to be ordered by the user.
    """

    MODEL_PATH = "bert/"
    if torch.cuda.is_available():
        device = "cuda"
    else:
        device = "cpu"
    max_text_len = 507

    token_type_ids = (
        torch.from_numpy(np.zeros(shape=max_text_len))
        .to(device)
        .to(torch.int32)
    )
    attention_mask = (
        torch.from_numpy(np.ones(shape=(1, max_text_len)))
        .to(device)
        .to(torch.int32)
    )

    def __init__(self, database):
        super().__init__(self.MODEL_PATH, database)

    def predict(self, user_id: int) -> List:
        history_user = self._database.history_user(user_id, 4)
        joint_vector = []
        for book in history_user:
            if book in self._book_vectors:
                joint_vector += self._book_vectors[book]
        book_preds = []
        books = []
        for book, vector in self._book_vectors.items():
            book_vector = joint_vector + vector
            book_vector += [0] * (self.max_text_len - len(book_vector))
            book_array = np.array([book_vector])
            book_torch_v = torch.from_numpy(book_array).to("cuda")

            input_v = {
                "input_ids": book_torch_v,
                "token_type_ids": self.token_type_ids,
                "attention_mask": self.attention_mask,
            }
            logits = self._model(**input_v)[0]
            preds = logits.cpu().detach().numpy()[0]
            pos_class = preds[1]
            book_preds.append(pos_class)
            books.append(book)
        book_preds = np.array(book_preds)
        books = np.array(books)
        best_book_indices = np.argsort(book_preds)
        books = books[best_book_indices][-5:]
        return books

    def load(self):
        if os.path.exists(self._local_model_path):
            self._model = AutoModelForSequenceClassification.from_pretrained(
                self._local_model_path,
            ).to(self.device)
            with open(self._local_model_path + "vectors.pcl", "rb") as f:
                self._book_vectors = pickle.load(f)

    def save(self):
        raise NotImplementedError()

    def train(self, *args, **kwargs):
        raise NotImplementedError()
