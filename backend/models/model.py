from abc import ABC, abstractmethod
from typing import List
import os


class Model(ABC):
    """
    Base class used for creating recommendation model.

    :params LOCAL_MODEL_PATH, str: absolute path to model folder in environment.
    :params MODEL_PATH, str: folder where the model contains.
    """
    LOCAL_MODEL_PATH = os.environ['LOCAL_MODEL_PATH']

    def __init__(self, model_path):
        self._model = None
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
