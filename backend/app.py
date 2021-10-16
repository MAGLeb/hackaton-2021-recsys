from flask import Flask, jsonify, request, Response, json

from core.strategies.factory import StrategyFactory

_app = Flask(__name__)


@_app.route('/', methods=['GET'])
def readiness_check():
    return '', 200


@_app.route('/', methods=['GET'])
def readiness_check():
    return '', 200


if __name__ == '__main__':
    _app.run(debug=False)
