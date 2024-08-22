document.addEventListener("DOMContentLoaded", () => {
    fetch("https://randomuser.me/api/?results=25")
        .then(response => response.json())
        .then(data => {
            const users = data.results;
            visualizeData(users);
        });
});

function visualizeData(users) {
   //barras
    const genderCounts = users.reduce((acc, user) => {
        acc[user.gender] = (acc[user.gender] || 0) + 1;
        return acc;
    }, {});

    new Chart(document.getElementById('genderChart'), {
        type: 'bar',
        data: {
            labels: Object.keys(genderCounts),
            datasets: [{
                label: 'Número de Usuarios por Género',
                data: Object.values(genderCounts),
                backgroundColor: ['#36a2eb', '#ff6384']
            }]
        }
    });
    
    //histograma
    const ageGroups = users.reduce((acc, user) => {
        const age = user.dob.age;
        const group = Math.floor(age / 10) * 10;
        acc[group] = (acc[group] || 0) + 1;
        return acc;
    }, {});

    new Chart(document.getElementById('ageHistogram'), {
        type: 'bar',
        data: {
            labels: Object.keys(ageGroups),
            datasets: [{
                label: 'Número de Usuarios por Edad',
                data: Object.values(ageGroups),
                backgroundColor: '#4bc0c0'
            }]
        }
    });

    //Listado 
    const countryCounts = users.reduce((acc, user) => {
        acc[user.location.country] = (acc[user.location.country] || 0) + 1;
        return acc;
    }, {});

    const countryList = document.getElementById('countryList');
    countryList.innerHTML = "<h2>Total de Usuarios por País</h2><ul>" +
        Object.entries(countryCounts).map(([country, count]) =>
            `<li>${country}: ${count}</li>`
        ).join('') +
        "</ul>";

    // Gráfica lineas 
    const yearCounts = users.reduce((acc, user) => {
        const year = new Date(user.registered.date).getFullYear();
        acc[year] = (acc[year] || 0) + 1;
        return acc;
    }, {});

    new Chart(document.getElementById('registeredChart'), {
        type: 'line',
        data: {
            labels: Object.keys(yearCounts),
            datasets: [{
                label: 'Usuarios Registrados por Año',
                data: Object.values(yearCounts),
                borderColor: '#ff9f40',
                fill: false
            }]
        }
    });
}