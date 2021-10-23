import numpy as np


def mean_average_precision_k(predictions: list, targets: list):
    """ Calculate mAP@k.

    :param predictions: list of predictions (id of book) for each user
    :param targets: list of target (id of book) for each user
    :return: current metric mAP@k type float
    """
    if not targets or not predictions:
        raise ValueError("Empty data.")

    map_k = []

    for prediction, target in zip(predictions, targets):
        max_tp = len(target)
        ap = 0
        tp = 0
        for pred_value, index in zip(prediction, range(len(prediction))):
            if tp == max_tp:
                break
            if pred_value in target:
                tp += 1
                ap += tp / (index + 1)
        ap /= max_tp
        map_k.append(ap)

    return np.mean(map_k)
