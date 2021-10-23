from abc import ABC, abstractmethod
from typing import List
import os

from backend.utils.utils import project_path


class Model(ABC):
    """
    Base class used for creating recommendation model.

    :params LOCAL_MODEL_PATH, str: absolute path to project folder.
    :params MODEL_PATH, str: folder where the model contains.
    """
    LOCAL_MODEL_PATH = project_path()

    def __init__(self, model_path, database):
        self._model = None
        self._database = database
        self._local_model_path = os.path.join(self.LOCAL_MODEL_PATH, model_path)

    @abstractmethod
    def train(self, *args, **kwargs):
        raise NotImplementedError()

    @abstractmethod
    def predict(self, *args, **kwargs) -> List:
        raise NotImplementedError()

    @abstractmethod
    def load(self):
        raise NotImplementedError()

    @abstractmethod
    def save(self):
        raise NotImplementedError()
