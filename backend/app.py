from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.factory import ModelFactory
from backend.database import Database

_app = Flask(__name__)
CORS(_app)
database = Database()

""" We have got default API for book presentation. And on API description will call it BOOK_DESCRIPTION.

BOOK_DESCRIPTION = {
    'id': book id; INT
    'title': title of book; STRING
    'author': author id of book; STRING
    'year': year of writing; INT
    'annotation': short description; STRING
    'age_restriction': age restriction; INT
    'volume': number pages in book; INT
    'genres': keywords and rubrics; LIST
    'available': number available books in total; INT
}
"""


@_app.route('/', methods=['GET'])
def readiness_check():
    return '', 200


@_app.route('/books', methods=['GET'])
def books():
    """ Return all books ids.

    Output data has JSON format:
    {
        "ids": [int, ...]
    }
    """
    all_users_id = database.unique_books_id()
    return jsonify(all_users_id)


@_app.route('/users', methods=['GET'])
def users():
    """ Return all users ids.

    Output data has JSON format:
    {
        "ids": [int, ...]
    }
    """
    all_users_id = database.unique_users_id()
    return jsonify(all_users_id)


@_app.route('/genres', methods=['GET'])
def genres():
    """ Return all genres for books.

    Output data has JSON format:
    {
        "genres": [str, ...]
    }
    """
    all_genres = database.unique_genres()
    return jsonify(all_genres)


@_app.route('/popular', methods=['GET'])
def popular():
    """ Return books ids for three topic:
        - popular this month,
        - Russian authors,
        - new books.

    Output data has JSON format:
    {
        "month": [{BOOK_DESCRIPTION}, ...],
        "russian": [{BOOK_DESCRIPTION}, ...],
        "news": [{BOOK_DESCRIPTION}, ...]
    }
    """
    popular_books_info = database.popular_books()
    return jsonify(popular_books_info)


@_app.route('/targets', methods=['GET'])
def targets():
    """ Return the description of books by the specified id.

    Input data from url has the next view: http://localhost:8888?
        &target_ids=int, ...

    Output data has JSON format:
    {
        "books": [{BOOK_DESCRIPTION}, ...],
    }
    """
    target_ids = list(map(int, request.args.get('target_ids').split(',')))
    popular_books_info = database.books_by_ids(target_ids)
    return jsonify(popular_books_info)


@_app.route('/books_filter', methods=['GET'])
def books_filter():
    """ Return filtered books by type and genres.

    Input data from url has the next view: http://localhost:8888?
        &type=Union['classic', 'modern']
        &genres=str, ...

    Output data has JSON format:
    {
        "books": [{BOOK_DESCRIPTION}, ...]
    }
    """
    book_type = request.args.get('type')
    genres = request.args.get('genres').split(',')

    if book_type is None or genres is None:
        return "Necessarily send two arguments: 'type' and 'genres'.", 400

    popular_books_info = database.books_filter_by_type_genre(book_type, genres)
    return jsonify(popular_books_info)


@_app.route('/recommendations', methods=['GET'])
def recommendations():
    """ Return recommendations for specified model.

    Input data from url has the next view: http://localhost:8888?
        &user_id=int
        &book_ids=int, ...
        &model_name=str

    Output data has JSON format:
    {
        "recommendations": [{BOOK_DESCRIPTION}, ...],
        "history": [{BOOK_DESCRIPTION}, ...]
    }
    """
    user_id = request.args.get('user_id')
    book_ids = request.args.get('book_ids')
    model_name = request.args.get('model_name')
    model = ModelFactory.create(model_name)

    if user_id is not None:
        ids = model.predict(user_id)
        predictions = database.books_by_ids(ids)
        return jsonify(predictions)
    elif book_ids is not None:
        ids = model.predict(book_ids)
        predictions = database.books_by_ids(ids)
        return jsonify(predictions)
    else:
        return "Send 'user_id' or 'book_ids', history of user interaction.", 400


if __name__ == '__main__':
    _app.run(debug=False)
