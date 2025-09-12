# Data Directory

This directory is for storing videogame sales data files.

## Expected CSV Format

The dashboard expects CSV files with the following columns:

- **Name**: Game title
- **Platform**: Gaming platform/console (e.g., PS4, Xbox, PC, Wii, etc.)
- **Year**: Release year
- **Genre**: Game genre (e.g., Action, Sports, Racing, etc.)
- **Publisher**: Game publisher
- **NA_Sales**: North America sales in millions
- **EU_Sales**: Europe sales in millions  
- **JP_Sales**: Japan sales in millions
- **Other_Sales**: Other regions sales in millions
- **Global_Sales**: Total global sales in millions

## Sample Data

You can find popular videogame sales datasets from sources like:
- Kaggle videogame sales datasets
- VGChartz data
- Industry reports

## File Naming

Recommended naming convention:
- `videogame_sales_YYYY.csv` (for yearly data)
- `videogame_sales_complete.csv` (for complete dataset)
- `videogame_sales_[platform].csv` (for platform-specific data)