import os
import random
import time
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
        self.books = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'books_desc.csv'), index_col=None, sep=',', nrows=271000)
        self.interactions = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'interactions.csv'))
        self.unique_users_ids = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'user_ids.csv'), encoding='cp1251')
        self.unique_rubrics = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'rubrics.csv'),
                                          encoding='cp1251', sep=';', index_col='id')

        self.books['id'] = list(map(lambda x: pd.to_numeric(x, errors='coerce'), self.books['id']))
        self.books = self.books[~self.books['id'].isna()]
        self.unique_books_ids = list(np.unique(self.books['id']))

        self.unique_users_ids = list(map(lambda x: pd.to_numeric(x, errors='coerce'), self.unique_users_ids['user_id']))

        self.popularity = None

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
        if self.popularity is None:
            date_now_custom = pd.to_datetime(self.interactions['dt'].describe()['top'])
            date_last_month = (date_now_custom - dateutil.relativedelta.relativedelta(months=1)).strftime('%Y-%m-%d')

            _1 = self.interactions[self.interactions['dt'] >= date_last_month]['book_id'].value_counts().index.tolist()[
                 :k]
            _2 = self.books[(self.books['rubrics'] == 'Английский язык') & (self.books['title'].notna())][
                     'id'].tolist()[:k]
            _3 = self.books[(self.books['rubrics'] == 'Ботаника') & (self.books['title'].notna())]['id'].tolist()[:k]
            self.popularity = [_1, _2, _3]
        return self.popularity

    def books_by_ids(self, ids: list):
        books_info = pd.DataFrame(columns=DEFAULT_COLUMNS_RETURN)
        split_books = self.books.loc[self.books['id'].isin(ids), DEFAULT_COLUMNS_RETURN]

        for id in ids:
            if id in split_books['id'].to_list():
                book = split_books.loc[split_books['id'] == id]
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
