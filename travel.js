// script.js
document.addEventListener('DOMContentLoaded', () => {
    const destinationsContainer = document.getElementById('destinations-container');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resetButton = document.getElementById('resetButton');

    fetch('travel.json') //  actual API endpoint
        .then(response => response.json())
        .then(data => {
            displayDestinations(data.countries); // Initial display

            searchButton.addEventListener('click', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredCountries = filterDestinations(data.countries, searchTerm);
                displayDestinations(filteredCountries);
            });

            resetButton.addEventListener('click', () => {
                searchInput.value = '';
                displayDestinations(data.countries); // Reset to original
            });
        })
        .catch(error => console.error("Error fetching data:", error));


    function displayDestinations(countries) {
        destinationsContainer.innerHTML = ''; // Clear previous content

        countries.forEach(country => {
            const countryDiv = document.createElement('div');
            countryDiv.classList.add('country');
            countryDiv.innerHTML = `<h2>${country.name}</h2>`;

            const citiesDiv = document.createElement('div');
            citiesDiv.classList.add('cities');

            country.cities.forEach(city => {
                const cityDiv = document.createElement('div');
                cityDiv.classList.add('city');
                cityDiv.innerHTML = `
                    <h3>${city.name}</h3>
                    <img src="${city.imageUrl}" alt="${city.name}">
                    <p>${city.description}</p>
                `;
                citiesDiv.appendChild(cityDiv);
            });

            countryDiv.appendChild(citiesDiv);
            destinationsContainer.appendChild(countryDiv);
        });
    }

    function filterDestinations(countries, searchTerm) {
        return countries.filter(country => {
            const countryMatch = country.name.toLowerCase().includes(searchTerm);
            const cityMatch = country.cities.some(city =>
                city.name.toLowerCase().includes(searchTerm) ||
                city.description.toLowerCase().includes(searchTerm)
            );
            return countryMatch || cityMatch;
        });
    }
});