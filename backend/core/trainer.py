from backend.core.models.item_similarity import ItemSimilarity
from backend.core.database import Database


class Trainer:
    """ Class for training models."""
    def __init__(self):
        models = {
            'rnn': None,
            'item_similarity': self.item_similarity,
            'collaborative_filtering': None,
            'random': None,
        }
        self.database = Database()

        for model_name, model_function in models.items():
            if model_function:
                model_function()

    def item_similarity(self):
        model = ItemSimilarity(self.database)
        model.train()
        model.save()


if __name__ == '__main__':
    strategy = Trainer()
