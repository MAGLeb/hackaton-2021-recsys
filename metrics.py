import numpy as np


def mean_average_precision_k(predictions: list, targets: list):
    """ Calculate mAP@k.

    :param predictions: list of predictions (id of book) for each user
    :param targets: list of target (id of book) for each user
    :return: current metric mAP@k type float
    """
    if len(targets) != len(predictions):
        raise IndexError("Length of predictions and targets are different.")
    if not targets:
        raise ValueError("Empty data.")

    map_k = []
    max_tp = len(targets[0])

    for prediction, target in zip(predictions, targets):
        ap = 0
        tp = 0
        for pred_value, target_value, index in zip(prediction, target, range(len(targets))):
            if tp == max_tp:
                break
            if pred_value == target_value:
                tp += 1
                ap += tp / index
        ap /= max_tp
        map_k.append(ap)

    return np.mean(map_k)
