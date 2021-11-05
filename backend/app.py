from flask import Flask, jsonify, request
from flask_cors import CORS

from backend.core.factory import ModelFactory
from backend.core.database import Database

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
    'rubrics': rubrics; LIST
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
    all_books_id = database.books_ids()
    response = {'ids': list(map(int, all_books_id))}
    return jsonify(response)


@_app.route('/users', methods=['GET'])
def users():
    """ Return all users ids.

    Output data has JSON format:
    {
        "ids": [int, ...]
    }
    """
    all_users_id = database.users_ids()
    response = {'ids': list(map(int, all_users_id))}
    return jsonify(response)


@_app.route('/rubrics', methods=['GET'])
def rubrics():
    """ Return all rubrics for books.

    Output data has JSON format:
    {
        "rubrics": [str, ...]
    }
    """
    all_rubrics = database.rubrics()
    response = {'rubrics': all_rubrics}
    return jsonify(response)


@_app.route('/popular', methods=['GET'])
def popular():
    """ Return books ids for three topic:
        - popular this month,
        - russian history (key: 'История России'),
        - new books of current year.

    Output data has JSON format:
    {
        "month": [{BOOK_DESCRIPTION}, ...],
        "russian": [{BOOK_DESCRIPTION}, ...],
        "news": [{BOOK_DESCRIPTION}, ...]
    }
    """
    month, english, botanic = database.popular_books()
    month_books = database.books_by_ids(month)
    english_books = database.books_by_ids(english)
    botanics_books = database.books_by_ids(botanic)
    response = {'month': month_books, 'english': english_books, 'botanic': botanics_books}
    return jsonify(response)


@_app.route('/targets', methods=['GET'])
def targets():
    """ Return the description of books by the specified id.

    Input data from url has the next view: http://localhost:8888?
        target_ids=int, ...

    Output data has JSON format:
    {
        "target": [{BOOK_DESCRIPTION}, ...],
    }
    """
    target_ids = request.args.get('target_ids')

    if target_ids is None:
        return "Necessarily send argument: 'targets_ids'.", 400

    target_ids = list(map(int, target_ids.split(',')))
    books_info = database.books_by_ids(target_ids)
    response = {'target': books_info}
    return jsonify(response)


@_app.route('/books_filter', methods=['GET'])
def books_filter():
    """ Return filtered books by type and rubrics.

    Input data from url has the next view: http://localhost:8888?
        type=Union['classic', 'modern']
        &rubrics=str, ...

    Output data has JSON format:
    {
        "books": [{BOOK_DESCRIPTION}, ...]
    }
    """
    rubrics = request.args.get('rubrics')

    if rubrics is None:
        return 'Necessarily send argument: "rubrics".', 400
    else:
        rubrics = rubrics.split(',')

    ids = database.books_filter_by_type_rubrics(rubrics)
    if ids:
        filtered_books = database.books_by_ids(ids)
    else:
        ids = database.random_books_ids(k=50)
        filtered_books = database.books_by_ids(ids)
    response = {'books': filtered_books}
    return jsonify(response)


@_app.route('/recommendations', methods=['GET'])
def recommendations():
    """ Return recommendations for specified model.

    Input data from url has the next view: http://localhost:8888?
        user_id=int
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

    if model_name is None:
        model_name = 'item_similarity'

    model = ModelFactory.create(model_name, database)

    if book_ids is None:
        # Case, for user with history.
        user_id = int(user_id)
        ids = model.predict(user_id)
        predictions = database.books_by_ids(ids)
        user_history_ids = database.history_user(user_id)
        user_history = database.books_by_ids(user_history_ids)
    elif book_ids is not None:
        # Case, when a user doesn't have history and chooses some books manually.
        not_existed_user_id = 1234567890
        book_ids = list(map(int, book_ids.split(',')))
        ids = model.predict(not_existed_user_id, book_ids)
        predictions = database.books_by_ids(ids)
        user_history = database.books_by_ids(book_ids)
    else:
        return "Send 'user_id' or 'book_ids' which is the history of the user interaction.", 400

    response = {'recommendations': predictions, 'history': user_history}
    return jsonify(response)


if __name__ == '__main__':
    _app.run(debug=False)
