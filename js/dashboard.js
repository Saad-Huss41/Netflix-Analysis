// Videogame Sales Dashboard JavaScript

class VideogameDashboard {
    constructor() {
        this.data = [];
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleData();
    }

    setupEventListeners() {
        // File upload functionality
        const csvUpload = document.getElementById('csv-upload');
        const loadSampleButton = document.getElementById('load-sample-data');

        if (csvUpload) {
            csvUpload.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        if (loadSampleButton) {
            loadSampleButton.addEventListener('click', () => this.loadSampleData());
        }

        // Drag and drop functionality
        const uploadContainer = document.querySelector('.upload-container');
        if (uploadContainer) {
            uploadContainer.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadContainer.style.borderColor = '#3498db';
            });

            uploadContainer.addEventListener('dragleave', (e) => {
                e.preventDefault();
                uploadContainer.style.borderColor = '#bdc3c7';
            });

            uploadContainer.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadContainer.style.borderColor = '#bdc3c7';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.processFile(files[0]);
                }
            });
        }
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === 'text/csv') {
            this.processFile(file);
        } else {
            alert('Please select a valid CSV file.');
        }
    }

    processFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            this.parseCSV(csv);
        };
        reader.readAsText(file);
    }

    parseCSV(csv) {
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',').map(v => v.trim());
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] || '';
                });
                data.push(row);
            }
        }

        this.data = data;
        this.updateDashboard();
    }

    loadSampleData() {
        // Sample videogame sales data for demonstration
        this.data = [
            {
                Name: "Wii Sports",
                Platform: "Wii",
                Year: "2006",
                Genre: "Sports",
                Publisher: "Nintendo",
                NA_Sales: "41.49",
                EU_Sales: "29.02",
                JP_Sales: "3.77",
                Other_Sales: "8.46",
                Global_Sales: "82.74"
            },
            {
                Name: "Super Mario Bros.",
                Platform: "NES",
                Year: "1985",
                Genre: "Platform",
                Publisher: "Nintendo",
                NA_Sales: "29.08",
                EU_Sales: "3.58",
                JP_Sales: "6.81",
                Other_Sales: "0.77",
                Global_Sales: "40.24"
            },
            {
                Name: "Mario Kart Wii",
                Platform: "Wii",
                Year: "2008",
                Genre: "Racing",
                Publisher: "Nintendo",
                NA_Sales: "15.85",
                EU_Sales: "12.88",
                JP_Sales: "3.79",
                Other_Sales: "3.31",
                Global_Sales: "35.82"
            },
            {
                Name: "Wii Sports Resort",
                Platform: "Wii",
                Year: "2009",
                Genre: "Sports",
                Publisher: "Nintendo",
                NA_Sales: "15.75",
                EU_Sales: "11.01",
                JP_Sales: "3.28",
                Other_Sales: "2.96",
                Global_Sales: "33.00"
            },
            {
                Name: "Pokemon Red/Pokemon Blue",
                Platform: "GB",
                Year: "1996",
                Genre: "Role-Playing",
                Publisher: "Nintendo",
                NA_Sales: "11.27",
                EU_Sales: "8.89",
                JP_Sales: "10.22",
                Other_Sales: "1.00",
                Global_Sales: "31.37"
            }
        ];

        this.updateDashboard();
    }

    updateDashboard() {
        this.updateMetrics();
        this.updateCharts();
        this.updateTopGamesTable();
    }

    updateMetrics() {
        if (this.data.length === 0) return;

        // Calculate metrics
        const totalSales = this.data.reduce((sum, game) => sum + parseFloat(game.Global_Sales || 0), 0);
        const totalGames = this.data.length;
        
        // Find top platform
        const platformSales = {};
        this.data.forEach(game => {
            const platform = game.Platform || 'Unknown';
            platformSales[platform] = (platformSales[platform] || 0) + parseFloat(game.Global_Sales || 0);
        });
        const topPlatform = Object.keys(platformSales).reduce((a, b) => platformSales[a] > platformSales[b] ? a : b);

        // Find top genre
        const genreSales = {};
        this.data.forEach(game => {
            const genre = game.Genre || 'Unknown';
            genreSales[genre] = (genreSales[genre] || 0) + parseFloat(game.Global_Sales || 0);
        });
        const topGenre = Object.keys(genreSales).reduce((a, b) => genreSales[a] > genreSales[b] ? a : b);

        // Update DOM elements
        document.getElementById('total-sales').textContent = totalSales.toFixed(2);
        document.getElementById('top-platform').textContent = topPlatform;
        document.getElementById('top-genre').textContent = topGenre;
        document.getElementById('total-games').textContent = totalGames.toLocaleString();
    }

    updateCharts() {
        this.createPlatformChart();
        this.createGenreChart();
        this.createTimeChart();
        this.createRegionChart();
    }

    createPlatformChart() {
        const ctx = document.getElementById('platformChart');
        if (!ctx) return;

        // Destroy existing chart
        if (this.charts.platform) {
            this.charts.platform.destroy();
        }

        const platformSales = {};
        this.data.forEach(game => {
            const platform = game.Platform || 'Unknown';
            platformSales[platform] = (platformSales[platform] || 0) + parseFloat(game.Global_Sales || 0);
        });

        const sortedPlatforms = Object.entries(platformSales)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10);

        this.charts.platform = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedPlatforms.map(([platform]) => platform),
                datasets: [{
                    label: 'Global Sales (Million)',
                    data: sortedPlatforms.map(([, sales]) => sales),
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createGenreChart() {
        const ctx = document.getElementById('genreChart');
        if (!ctx) return;

        if (this.charts.genre) {
            this.charts.genre.destroy();
        }

        const genreSales = {};
        this.data.forEach(game => {
            const genre = game.Genre || 'Unknown';
            genreSales[genre] = (genreSales[genre] || 0) + parseFloat(game.Global_Sales || 0);
        });

        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'];
        
        this.charts.genre = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(genreSales),
                datasets: [{
                    data: Object.values(genreSales),
                    backgroundColor: colors.slice(0, Object.keys(genreSales).length),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createTimeChart() {
        const ctx = document.getElementById('timeChart');
        if (!ctx) return;

        if (this.charts.time) {
            this.charts.time.destroy();
        }

        const yearSales = {};
        this.data.forEach(game => {
            const year = game.Year || 'Unknown';
            yearSales[year] = (yearSales[year] || 0) + parseFloat(game.Global_Sales || 0);
        });

        const sortedYears = Object.entries(yearSales)
            .filter(([year]) => year !== 'Unknown' && !isNaN(year))
            .sort(([a], [b]) => parseInt(a) - parseInt(b));

        this.charts.time = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedYears.map(([year]) => year),
                datasets: [{
                    label: 'Global Sales (Million)',
                    data: sortedYears.map(([, sales]) => sales),
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createRegionChart() {
        const ctx = document.getElementById('regionChart');
        if (!ctx) return;

        if (this.charts.region) {
            this.charts.region.destroy();
        }

        const regionSales = {
            'North America': this.data.reduce((sum, game) => sum + parseFloat(game.NA_Sales || 0), 0),
            'Europe': this.data.reduce((sum, game) => sum + parseFloat(game.EU_Sales || 0), 0),
            'Japan': this.data.reduce((sum, game) => sum + parseFloat(game.JP_Sales || 0), 0),
            'Other': this.data.reduce((sum, game) => sum + parseFloat(game.Other_Sales || 0), 0)
        };

        this.charts.region = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(regionSales),
                datasets: [{
                    label: 'Regional Sales (Million)',
                    data: Object.values(regionSales),
                    backgroundColor: ['#e74c3c', '#3498db', '#f39c12', '#2ecc71'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateTopGamesTable() {
        const tbody = document.querySelector('#top-games-table tbody');
        if (!tbody) return;

        // Sort games by global sales
        const sortedGames = [...this.data]
            .sort((a, b) => parseFloat(b.Global_Sales || 0) - parseFloat(a.Global_Sales || 0))
            .slice(0, 10);

        tbody.innerHTML = '';

        sortedGames.forEach((game, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${game.Name || 'N/A'}</td>
                <td>${game.Platform || 'N/A'}</td>
                <td>${game.Genre || 'N/A'}</td>
                <td>${parseFloat(game.Global_Sales || 0).toFixed(2)}</td>
                <td>${game.Year || 'N/A'}</td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideogameDashboard();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VideogameDashboard;
}