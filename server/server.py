from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

model_path = 'models/'

# Load your trained machine learning model
with open(model_path + 'weather_v1.pkl', 'rb') as file:
    model = pickle.load(file)

# app instance
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({
        'message': 'Welcome to the API'
    })

@app.route('/predict_weather', methods=['POST'])
def predict_weather():
    data = request.get_json()  # Assuming data is sent as JSON
    
    # Access the weather information
    temperature = data.get('temperature')
    apparent_temperature = data.get('apparentTemperature')
    pressure = data.get('pressure')
    wind_speed = data.get('windSpeed')
    wind_bearing = data.get('windBearing')
    visibility = data.get('visibility')
    cloud_cover = data.get('cloudCover')
    
    # Use the loaded model to make predictions
    prediction = model.predict([[temperature, apparent_temperature, pressure, wind_speed, wind_bearing, visibility, cloud_cover]])
    
    # count    503910.000000
    # mean          0.076229
    # std           0.128428
    # min           0.000000
    # 25%           0.003367
    # 50%           0.004283
    # 75%           0.083917
    # max           0.613883
    # Name: gen, dtype: float64

    # If predicted gen is greater than mean,
    # then say recommended to carry high electricity consumption activities
    # else say recommended to carry low electricity consumption activities

    mean = 0.076229

    if prediction[0] >= mean:
        recommendation = 'Recommended to carry high electricity consumption activities'
        diff = 'Solar energy generation is higher than usual generation of {} kW'.format(prediction[0]-0.076229)
    else:
        recommendation = 'Recommended to carry low electricity consumption activities'
        diff = 'Solar energy generation is lower than usual generation of {} kW'.format(0.076229-prediction[0])

    # Return the prediction as JSON
    return jsonify({
        'prediction': prediction[0],
        'recommendation': recommendation,
        'diff': diff
    })

if __name__ == '__main__':
    app.run(debug=True)