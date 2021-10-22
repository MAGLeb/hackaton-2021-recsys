from backend.models.model import Model
from backend.models.item_similarity import ItemSimilarity
from backend.models.random import Random


class ModelFactory:
    """ Factory to create correct model for given name. Class save loaded models.

    :params model_name str: name to implement existing model.
    """
    current_models = {}
    model_name_to_class = {
        'rnn': None,
        'item_similarity': ItemSimilarity,
        'random': Random,
    }

    @classmethod
    def reload_model(cls, model_name):
        if model_name in cls.current_models:
            cls.current_models[model_name] = cls.model_name_to_class[model_name]()

    @classmethod
    def create(cls, model_name) -> Model:
        if model_name not in cls.model_name_to_class:
            raise ValueError('This strategy type: {}, is not supported'.format(model_name))

        if model_name not in cls.current_models:
            cls.current_models[model_name] = cls.model_name_to_class[model_name]()

        return cls.current_models[model_name]
