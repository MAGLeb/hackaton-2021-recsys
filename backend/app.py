from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.strategy import ModelFactory
from backend.database import Database

_app = Flask(__name__)
CORS(_app)
database = Database()

""" We have got default API for book presentation. And on API description will call it BOOK_DESCRIPTION.

BOOK_DESCRIPTION = {
    'id': book id
    'title': title of book
    'author': author id of book
    'year': year of writing
    'annotation': short description
    'age_restriction': age restriction
    'volume': number pages in book
    'rubric': rubric
    'keyword': additional rubric keywords
    'title_additional': additional title
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
    all_users_id = database.get_all_unique_books_id()
    return jsonify(all_users_id)


@_app.route('/users', methods=['GET'])
def users():
    """ Return all users ids.

    Output data has JSON format:
    {
        "ids": [int, ...]
    }
    """
    all_users_id = database.get_all_unique_users_id()
    return jsonify(all_users_id)


@_app.route('/genres', methods=['GET'])
def genres():
    """ Return all genres for books.

    Output data has JSON format:
    {
        "genres": [str, ...]
    }
    """
    all_genres = database.get_all_unique_genres()
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
    popular_books_info = database.get_popular_books()
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
    target_ids = request.args.get('target_ids')
    popular_books_info = database.get_books_by_ids(target_ids)
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
    genres = request.args.get('genres')

    if book_type is None or genres is None:
        return "Necessarily send two arguments: 'type' and 'genres'.", 400

    popular_books_info = database.get_filtered_books(book_type, genres)
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
        predictions = model.predict(user_id)
        return jsonify(predictions)
    elif book_ids is not None:
        predictions = model.predict(book_ids)
        return jsonify(predictions)
    else:
        return "Send 'user_id' or 'book_ids', history of user interaction.", 400


if __name__ == '__main__':
    _app.run(debug=False)