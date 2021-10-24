import argparse
import os

NUMBER_ITEMS_TO_RETURN = 25


def project_path() -> str:
    return os.path.abspath(os.path.join(os.curdir, '..'))


def parse_arguments():
    """Parse job arguments."""

    parser = argparse.ArgumentParser()

    parser.add_argument(
        '--model',
        type=str,
        help="Choose one of: ['rnn', 'item_similarity', 'collaborative_filtering'] models.",
        required=True
    )

    args = parser.parse_args()
    arguments = args.__dict__

    return arguments
