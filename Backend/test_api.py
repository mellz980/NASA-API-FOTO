import requests

def test_api():
    url = "https://api.nasa.gov/planetary/apod"
    params = {
        "api_key": "DEMO_KEY",
        "date": "2020-05-15"
    }
    
    response = requests.get(url, params=params, verify=False)
    print(response.status_code)
    print(response.json())

if __name__ == "__main__":
    test_api()
