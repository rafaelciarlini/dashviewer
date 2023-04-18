from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

# Connect to the SQLite database
conn = sqlite3.connect('portfolio.db')

# Define the SQL query to retrieve portfolio data
query = """
    SELECT symbol, group_name, shares
    FROM portfolio
    WHERE portfolio_name = ? AND date = ?
"""

# Define a route to retrieve portfolio data
@app.route('/portfolio/<name>/<date>')
def get_portfolio_data(name, date):
    # Execute the SQL query with the given parameters
    cursor = conn.execute(query, (name, date))
    # Fetch all rows returned by the query
    rows = cursor.fetchall()
    # Convert the rows to a list of dictionaries
    portfolio_data = []
    for row in rows:
        portfolio_data.append({
            'symbol': row[3],
            'quantity': row[4],
            'price': row[6]
        })
    # Return the portfolio data as JSON
    return jsonify({'name': name, 'date': date, 'data': portfolio_data})

if __name__ == '__main__':
    app.run(debug=True)

TESTE = get_portfolio_data()