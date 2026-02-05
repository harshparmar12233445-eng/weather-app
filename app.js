const form = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const result = document.getElementById('result');
const errorEl = document.getElementById('error');
const cityNameEl = document.getElementById('cityName');
const descriptionEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const iconEl = document.getElementById('icon');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  errorEl.classList.add('hidden');
  result.classList.add('hidden');

  try {
    const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    if (!res.ok) {
      const err = await res.json().catch(()=>({message: 'Unknown error'}));
      throw new Error(err.message || 'Failed to fetch weather');
    }
    const data = await res.json();
    cityNameEl.textContent = `${data.name}, ${data.country || ''}`;
    descriptionEl.textContent = data.description;
    tempEl.textContent = Math.round(data.temperature);
    humidityEl.textContent = data.humidity;
    windEl.textContent = data.wind_speed;
    if (data.icon_url) {
      iconEl.src = data.icon_url;
      iconEl.alt = data.description;
    } else {
      iconEl.src = '';
      iconEl.alt = '';
    }
    result.classList.remove('hidden');
  } catch (err) {
    errorEl.textContent = err.message || 'Could not get weather';
    errorEl.classList.remove('hidden');
  }
});