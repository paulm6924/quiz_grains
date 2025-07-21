from flask import Flask, render_template, url_for

app = Flask(__name__)

# Route pour la page d'accueil (index.html)
@app.route('/')
def index():
    return render_template('index.html')

# Route pour la page des crédits (credit.html)
@app.route('/credit')
def credit():
    return render_template('credit.html')


if __name__ == '__main__':
    app.run(debug=True)