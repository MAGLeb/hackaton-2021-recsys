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
    month, russian, news = database.popular_books()
    month_books = database.books_by_ids(month)
    russian_books = database.books_by_ids(month)
    news_books = database.books_by_ids(month)
    response = {'month': month_books, 'russian': russian_books, 'new': news_books}
    return jsonify(response)


@_app.route('/targets', methods=['GET'])
def targets():
    """ Return the description of books by the specified id.

    Input data from url has the next view: http://localhost:8888?
        target_ids=int, ...

    Output data has JSON format:
    {
        "books": [{BOOK_DESCRIPTION}, ...],
    }
    """
    target_ids = request.args.get('target_ids')

    if target_ids is None:
        return "Necessarily send argument: 'targets_ids'.", 400

    target_ids = list(map(int, target_ids.split(',')))
    popular_books_info = database.books_by_ids(target_ids)
    return jsonify(popular_books_info)


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
    book_type = request.args.get('type')
    rubrics = request.args.get('rubrics')

    if book_type is None or rubrics is None:
        return 'Necessarily send two arguments: "type" and "rubrics".', 400
    else:
        rubrics = rubrics.split(',')

    if book_type not in ['classic', 'modern']:
        return 'Argument "book_type" must be only one of: ["classic", "modern"].', 400

    ids = database.books_filter_by_type_rubrics(book_type, rubrics)
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
    model = ModelFactory.create(model_name, database)

    if book_ids is None:
        ids = model.predict(user_id)
        predictions = database.books_by_ids(ids)
        return jsonify(predictions)
    elif book_ids is not None:
        ids = model.predict(user_id, book_ids)
        predictions = database.books_by_ids(ids)
        return jsonify(predictions)
    else:
        return "Send 'user_id' and 'book_ids' which is history of user interaction.", 400


if __name__ == '__main__':
    _app.run(debug=False)
