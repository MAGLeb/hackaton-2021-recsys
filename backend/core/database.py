import os
import random
from typing import Union
import dateutil.relativedelta

import pandas as pd
import numpy as np

from backend.utils.utils import project_path, NUMBER_ITEMS_TO_RETURN

PROJECT_PATH = project_path()
DEFAULT_COLUMNS_RETURN = ['id', 'title', 'author', 'year', 'annotation',
                          'age_restriction', 'volume', 'rubrics', 'available']


class Database:
    """ Class for working with data, replaces SQL. All data stored in RAM."""
    # TODO implement DataBase for working with all data, because of enormous size

    def __init__(self):
        self.books = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'books.csv'))
        self.interactions = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'interactions.csv'))
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

    def popular_books(self, k: int = NUMBER_ITEMS_TO_RETURN):
        """
        1 - popular this month
        2 - english books (key: 'Английский язык')
        3 - botanic (key: 'Ботаника')
        """
        date_now_custom = pd.to_datetime(self.interactions['dt'].describe()['top'])
        date_last_month = (date_now_custom - dateutil.relativedelta.relativedelta(months=1)).strftime('%Y-%m-%d')

        _1 = self.interactions[self.interactions['dt'] >= date_last_month]['book_id'].value_counts().index.tolist()[:k]
        _2 = self.books[self.books['rubrics'] == 'Английский язык'].index.tolist()[:k]
        _3 = self.books[self.books['rubrics'] == 'Ботаника'].index.tolist()[:k]
        return [_1, _2, _3]

    def books_by_ids(self, ids: list):
        books_info = pd.DataFrame(columns=DEFAULT_COLUMNS_RETURN)
        books_ids = self.books['id'].values.tolist()

        for id in ids:
            if id in books_ids:
                book = self.books.loc[self.books['id'] == id, DEFAULT_COLUMNS_RETURN]
                books_info = books_info.append(book, ignore_index=True)
            else:
                book = {column: None for column in DEFAULT_COLUMNS_RETURN}
                book['id'] = id
                books_info = books_info.append(book, ignore_index=True)

        return books_info.to_dict('records')

    def books_filter_by_type_rubrics(self, rubrics: list, k: int = NUMBER_ITEMS_TO_RETURN):
        books = self.books[self.books['rubrics'].isin(rubrics)]
        ids = books['id'].values.tolist()
        return ids[:k]

    def random_books_ids(self, k: int = NUMBER_ITEMS_TO_RETURN) -> list:
        return random.sample(self.unique_books_ids, k)

    def history_user(self, user_id: int, k: int = NUMBER_ITEMS_TO_RETURN) -> list:
        return list(np.unique(self.interactions[self.interactions['user_id'] == user_id]
                              .sort_values(by='dt')['book_id']))[-k:][::-1]
