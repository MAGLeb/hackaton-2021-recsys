import os
import random
from typing import Union

import pandas as pd
import numpy as np

PROJECT_PATH = os.path.abspath('../')
DEFAULT_COLUMNS_RETURN = ['id', 'title', 'author', 'year', 'annotation',
                          'age_restriction', 'volume', 'rubrics', 'available']


class Database:
    """ Class for working with data, replaces SQL."""

    def __init__(self):
        self.books = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'books.csv'))
        self.interactions = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'user_book_interaction_full.csv'))
        self.unique_books_ids = None
        self.unique_users_ids = None
        self.unique_rubrics = None

        self._find_static_data()

    def _find_static_data(self):
        self.unique_books_ids = list(np.unique(self.books['id']))
        self.unique_users_ids = list(np.unique(self.interactions['user_id']))
        self.unique_rubrics = self._get_unique_rubrics()

    @staticmethod
    def _get_unique_rubrics():
        rubrics = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'rubrics.csv'),
                              encoding='cp1251', sep=';', index_col='id')
        rubrics = rubrics.values.reshape(1, len(rubrics)).tolist()[0]

        return rubrics

    def books_ids(self) -> list:
        return self.unique_books_ids

    def users_ids(self) -> list:
        return self.unique_users_ids

    def rubrics(self) -> list:
        return self.unique_rubrics

    def popular_books(self):
        # TODO
        pass

    def books_by_ids(self, ids: list):
        return self.books.loc[ids, DEFAULT_COLUMNS_RETURN].to_dict('records')

    def books_filter_by_type_rubrics(self, book_type: Union['classic', 'modern'], rubrics: list):
        if book_type == 'classic':
            books = self.books[self.books['year'] <= 2000]
        elif book_type == 'modern':
            books = self.books[self.books['year'] >= 2000]
        else:
            raise ValueError('Argument "book_type" must be only one of: ["classic", "modern"].')

        books = books[books['rubrics'].isin(rubrics)]
        return books

    def random_books_ids(self, k: int = 5) -> list:
        return random.sample(self.unique_books_ids, k)

    def history_user(self, user_id: int) -> list:
        return list(np.unique(self.interactions[self.interactions['user_id'] == user_id]['id']))
