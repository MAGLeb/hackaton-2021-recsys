from turicreate import SFrame

from backend.models.item_similarity import ItemSimilarity
from backend.models.random import Random
from backend.database import Database
from backend.utils.utils import parse_arguments


class Trainer:
    def __init__(self):
        models = {
            'rnn': None,
            'item_similarity': ItemSimilarity,
            'collaborative_filtering': None,
            'random': Random,
        }
        self.database = Database()

        args = parse_arguments()
        model_name = args['model']

        if model_name not in models.keys():
            raise NotImplementedError(f"We don't support ({model_name}) model.")

        models[model_name]()

    def daniel_strategy(self):
        dataset = self.database.scores_from_interval()

        daniel = DanielModel()
        daniel.train(dataset['user_id'], dataset['item_id'], dataset['score'])
        daniel.save()

    def similarity_strategy(self):
        matched_id = SFrame(self.database.artworks_id_and_filenames())

        sim = SimilarityModel()
        sim.train(matched_id=matched_id)
        sim.save()
        sim.save_graph()


if __name__ == '__main__':
    strategy = Strategy()