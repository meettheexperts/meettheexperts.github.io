Google Sheets Template for Our Farm (AgriStore)

File: sheet-template.csv

How to use
1. Open Google Sheets.
2. File → Import → Upload → select `sheet-template.csv`.
3. Choose "Replace current sheet" or "Insert new sheet" and click "Import data".

Notes / Requirements
- `id`: unique, no spaces or special characters (use hyphens or underscores).
- `category`: use exactly `Livestock`, `Poultry`, or `Crops` to match filters (or update the site code).
- `available` and `new`: use uppercase `TRUE` or `FALSE`.
- `price`: numeric only (no commas or currency symbols).
- `image`: full URL to an image. If empty, site shows a placeholder.
- Ensure every row has `name` and `category` to avoid script errors.

Optional: After importing, publish the sheet or use an opensheet/elks endpoint to provide JSON to the site.
