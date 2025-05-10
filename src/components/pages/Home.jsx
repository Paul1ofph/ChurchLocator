import React, { useState } from 'react';
import axios from 'axios'

const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const ChurchLocatorWithSearch = () => {
  const [locationInput, setLocationInput] = useState('');
  const [churches, setChurches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!locationInput.trim()) return;

    setLoading(true);
    setError('');
    setChurches([]);

    try {
      // Step 1: Get coordinates from address input
      const geoRes = await axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: locationInput,
            key: API_KEY,
          },
        }
      );

      const { lat, lng } = geoRes.data.results[0].geometry.location;

      // Step 2: Get nearby churches using coordinates
      const placesRes = await axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        {
          params: {
            location: `${lat},${lng}`,
            radius: 10000, // 10km
            keyword: 'Seventh-day Adventist Church',
            key: API_KEY,
          },
        }
      );

      setChurches(placesRes.data.results);
    } catch (err) {
      console.error(err);
      setError('Could not find churches for that location.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Find Nearby Adventist Churches</h2>

      <div>
        <input
          type="text"
          placeholder="Enter city or location"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
        />
        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}

      {churches.length > 0 &&
        churches.map((church) => (
          <div key={church.place_id}>
            <h3>{church.name}</h3>
            <p>{church.vicinity}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                church.name
              )}&query_place_id=${church.place_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default ChurchLocatorWithSearch;

