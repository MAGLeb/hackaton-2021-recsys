import os
import random
from typing import Union

import pandas as pd
import numpy as np

PROJECT_PATH = os.path.abspath('../')
DEFAULT_COLUMN = ['id', 'title', 'year', 'contribution', 'annotation', 'keyword',
       'titleAdditionalInfo', 'volume', 'parallelTitle', 'publicationType',
       'language_name', 'material_name', 'ageRestriction_name', 'rubric_name',
       'author_id', 'serial_name', 'collapse_field', 'title_orig',
       'available']
DEFAULT_COLUMNS_RETURN = ['id', 'title', 'author', 'year', 'annotation', 'age_restriction',
                          'volume', 'rubric', 'keyword', 'title_additional', 'available']

columns = ['id', 'bbk', 'title', 'year', 'contribution', 'annotation', 'keyword',
       'titleAdditionalInfo', 'volume', 'parallelTitle', 'publicationType',
       'language_name', 'material_name', 'ageRestriction_name', 'rubric_name',
       'author_id', 'serial_name', 'collapse_field', 'title_orig',
       'available']


class Database:
    def __init__(self):
        self.books = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'books.csv'))
        self.interactions = pd.read_csv(os.path.join(PROJECT_PATH, 'data', 'user_book_interaction.csv'))

        self._find_static_data()

    def _find_static_data(self):
        self.unique_books_ids = list(np.unique(self.books['id']))
        self.unique_users_ids = list(np.unique(self.interactions['user_id']))

    def get_all_unique_books_id(self) -> list:
        return self.unique_books_ids

    def get_all_unique_users_id(self) -> list:
        return self.unique_users_ids

    def get_all_unique_genres(self):
        pass

    def get_popular_books(self):
        pass

    def get_books_by_ids(self, ids: list):
        return self.books.loc[ids, DEFAULT_COLUMNS_RETURN].to_dict('records')

    def get_filtered_books(self, book_type: Union['classic', 'modern'], genres: list):
        if book_type == 'classic':
            books = self.books[self.books['year'] <= 2000]
        elif book_type == 'modern':
            books = self.books[self.books['year'] >= 2000]
        else:
            raise ValueError('Argument "book_type" must be only one of: ["classic", "modern"].')

        books = books[books['keyword'].isin(genres) or
                      books['rubric_name'].isin(genres) or
                      books['serial_name'].isin(genres)]

        return books

    def get_random_books_ids(self, k: int = 5) -> list:
        return random.sample(self.unique_books_ids, k)

    def get_history_user(self, user_id: int) -> list:
        return list(np.unique(self.interactions[self.interactions['user_id'] == user_id]['id']))
