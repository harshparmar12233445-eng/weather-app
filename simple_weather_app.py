import requests

def get_weather(city, api_key):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        main = data["main"]
        weather = data["weather"][0]
        print(f"Weather in {city}: {weather['description'].title()}")
        print(f"Temperature: {main['temp']} °C")
        print(f"Feels like: {main['feels_like']} °C")
        print(f"Humidity: {main['humidity']}%")
    else:
        print("City not found or invalid API key.")

def main():
    api_key = input("Enter your OpenWeatherMap API key: ")
    city = input("Enter your city name: ")
    get_weather(city, api_key)

if __name__ == "__main__":
    main()