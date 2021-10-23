import os
import random
from typing import Union
from datetime import datetime
import dateutil.relativedelta

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

    def popular_books(self, k: int = 25):
        """
        1 - popular this month
        2 - russian history (key: 'История России')
        3 - new books of 2021 (current year)
        """
        date_now_custom = pd.to_datetime(self.interactions['dt'].describe()['top'])
        date_last_month = (date_now_custom - dateutil.relativedelta.relativedelta(months=1)).strftime('%Y-%m-%d')
        current_year = date_now_custom.year

        _1 = self.interactions[self.interactions['dt'] >= date_last_month]['book_id'].value_counts().index.tolist()[:k]
        _2 = self.books[self.books['rubrics'] == 'История России'][:k]
        _3 = self.books[self.books['year'] == current_year][:k]
        return [_1, _2, _3]

    def books_by_ids(self, ids: list):
        return self.books.loc[self.books['id'].isin(ids), DEFAULT_COLUMNS_RETURN].to_dict('records')

    def books_filter_by_type_rubrics(self, book_type: Union['classic', 'modern'], rubrics: list, k: int = 25):
        if book_type == 'classic':
            books = self.books[self.books['year'] <= 2000]
        else:
            books = self.books[self.books['year'] >= 2000]

        books = books[books['rubrics'].isin(rubrics)]
        ids = books['id'][:k]
        return ids

    def random_books_ids(self, k: int = 5) -> list:
        return random.sample(self.unique_books_ids, k)

    def history_user(self, user_id: int) -> list:
        return list(np.unique(self.interactions[self.interactions['user_id'] == user_id]['id']))
