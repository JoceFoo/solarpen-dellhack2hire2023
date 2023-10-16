from server import app
import unittest

class TestPredictWeatherRoute(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_predict_weather_endpoint(self):
        # Test Case 1: Normal weather conditions
        data = {
            "temperature": 25,
            "apparentTemperature": 26,
            "pressure": 1015,
            "windSpeed": 5,
            "windBearing": 180,
            "visibility": 10,
            "cloudCover": 0.3
        }
        response = self.app.post('/predict_weather', json=data)
        result = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('prediction', result)
        self.assertIn('recommendation', result)
        self.assertIn('diff', result)

        # Test Case 2: Extreme temperatures
        data = {
            "temperature": 40,
            "apparentTemperature": 42,
            "pressure": 1020,
            "windSpeed": 8,
            "windBearing": 270,
            "visibility": 5,
            "cloudCover": 0.8
        }
        response = self.app.post('/predict_weather', json=data)
        result = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('prediction', result)
        self.assertIn('recommendation', result)
        self.assertIn('diff', result)

        # Test Case 3: Low visibility and high cloud cover
        data = {
            "temperature": 20,
            "apparentTemperature": 19,
            "pressure": 1010,
            "windSpeed": 3,
            "windBearing": 90,
            "visibility": 1,
            "cloudCover": 0.9
        }
        response = self.app.post('/predict_weather', json=data)
        result = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIn('prediction', result)
        self.assertIn('recommendation', result)
        self.assertIn('diff', result)

# Primary goal is to check whether the /predict_weather endpoint returns HTTP status 200 and if the expected information is present in the response JSON.