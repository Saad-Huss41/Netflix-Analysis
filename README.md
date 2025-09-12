# Videogame Sales Dashboard

A simple, interactive dashboard to understand and visualize videogame sales data. This dashboard provides comprehensive insights into gaming industry trends, platform performance, genre popularity, and regional sales patterns.

## Features

### 📊 Key Metrics
- Total global sales
- Best performing platform
- Most popular genre
- Total number of games tracked

### 📈 Interactive Charts
- **Sales by Platform**: Bar chart showing performance across gaming platforms
- **Sales by Genre**: Doughnut chart displaying genre popularity
- **Sales Trends Over Time**: Line chart tracking sales evolution by year
- **Regional Sales Distribution**: Bar chart comparing North America, Europe, Japan, and other regions

### 🎮 Top Games Table
- Ranked list of best-selling games
- Detailed information including platform, genre, and sales figures
- Responsive table design for easy browsing

### 📁 Data Management
- CSV file upload functionality
- Drag and drop support
- Sample data loader for testing
- Expected data format documentation

## Getting Started

### Quick Start (No Installation Required)
1. Open `index.html` in your web browser
2. The dashboard loads with sample data automatically
3. Use "Load Sample Data" button to refresh with demo data
4. Upload your own CSV files using the upload section

### Local Development Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have live-server installed)
npm install -g live-server
live-server --port=8000
```

Then open http://localhost:8000 in your browser.

## Data Format

The dashboard expects CSV files with the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| Name | Game title | "Super Mario Bros." |
| Platform | Gaming platform | "NES", "PS4", "Xbox" |
| Year | Release year | "1985" |
| Genre | Game genre | "Platform", "Action" |
| Publisher | Game publisher | "Nintendo" |
| NA_Sales | North America sales (millions) | "29.08" |
| EU_Sales | Europe sales (millions) | "3.58" |
| JP_Sales | Japan sales (millions) | "6.81" |
| Other_Sales | Other regions sales (millions) | "0.77" |
| Global_Sales | Total global sales (millions) | "40.24" |

### Sample CSV Format
```csv
Name,Platform,Year,Genre,Publisher,NA_Sales,EU_Sales,JP_Sales,Other_Sales,Global_Sales
Wii Sports,Wii,2006,Sports,Nintendo,41.49,29.02,3.77,8.46,82.74
Super Mario Bros.,NES,1985,Platform,Nintendo,29.08,3.58,6.81,0.77,40.24
```

## File Structure

```
├── index.html              # Main dashboard page
├── css/
│   └── styles.css          # Dashboard styling
├── js/
│   └── dashboard.js        # Dashboard functionality
├── data/
│   ├── README.md           # Data format documentation
│   └── sample_data.csv     # Sample dataset
├── assets/
│   └── README.md           # Assets documentation
├── package.json            # NPM configuration
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with modern features (Grid, Flexbox, Custom Properties)
- **JavaScript (ES6+)**: Interactive functionality and data processing
- **Chart.js**: Data visualization library
- **Responsive Design**: Mobile-friendly layout

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Data Sources

Popular videogame sales datasets can be found on:
- [Kaggle Videogame Sales](https://www.kaggle.com/gregorut/videogamesales)
- VGChartz
- Industry reports and market research

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Advanced filtering and search functionality
- [ ] Export charts as images
- [ ] More chart types (scatter plots, heatmaps)
- [ ] Data comparison tools
- [ ] Performance optimization for large datasets
- [ ] Dark mode theme
- [ ] Mobile app version
