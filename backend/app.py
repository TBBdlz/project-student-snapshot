from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

nltk.download('vader_lexicon')

sia = SentimentIntensityAnalyzer()

app = Flask(__name__)
CORS(app=app)

THRESHOLD = 0.05


def analyze_sentiment(message: str) -> str:
    scores = sia.polarity_scores(message)
    compound_score = scores['compound']  # get data from dict
    if compound_score >= THRESHOLD:
        return "Positive"
    elif compound_score <= -THRESHOLD:
        return "Negative"
    else:
        return "Neutral"


@app.route("/")
def index():
    return "Hello Flask!"


@app.route("/api/sentiment", methods=["POST"])
def sentiment_analysis():
    # convert json data into python dictionary
    data = request.json  # dictionary
    message = data.get("message", "")
    sentiment = analyze_sentiment(message)
    return jsonify({
        "message": message,
        "sentiment": sentiment,
        "status": 200,
    })


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
