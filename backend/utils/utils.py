import os
import argparse

NUMBER_ITEMS_TO_RETURN = 10


def project_path() -> str:
    name_project = 'library_rec_sys'
    abs_path = os.path.abspath(os.path.curdir)
    while os.path.basename(abs_path) != name_project:
        abs_path = os.path.dirname(abs_path)
    return abs_path


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
