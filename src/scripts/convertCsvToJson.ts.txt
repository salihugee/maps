import csv
import json

csv_file = "companies.csv"  # Replace with your actual file
json_file = "companies.json"

data = []

with open(csv_file, encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        data.append({
            "id": row["Company Name"].replace(" ", "_").lower(),
            "name": row["Company Name"],
            "category": row["Category"],
            "commodity": row["Commodity"],
            "officeAddress": row["Office Address"],
            "contactPerson": row["Contact Person"],
            "phoneNumber": row["Phone number"],
            "designation": row["Designation"],
            "emailWebsite": row["Email/Website"],
            "coordinates": [float(row["Latitude"]), float(row["Longitude"])]
        })

with open(json_file, "w", encoding="utf-8") as json_out:
    json.dump(data, json_out, indent=4)

print("Conversion complete. JSON saved as", json_file)
