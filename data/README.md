# Cartly product CSV files

## Files

| File | Purpose |
|------|---------|
| `cartly-products.csv` | 40 demo products (legal Unsplash images, INR prices) |
| `cartly-products-template.csv` | Empty template — copy and fill with your real products |

## Column guide

| Column | Required | Example |
|--------|----------|---------|
| `name` | Yes | Samsung Galaxy M34 5G |
| `description` | Yes | 6.5 inch AMOLED display |
| `price` | Yes | 15999 (INR, no ₹ symbol) |
| `stock` | Yes | 120 |
| `imageUrl` | Yes | https://... direct image link |
| `categoryName` | Yes | Mobiles & Tablets |

Categories are created automatically if they do not exist.

## How to import

1. Log in as admin (`admin@shop.com` / `admin123`)
2. Open **Admin** → **Upload CSV**
3. Select your `.csv` file

Or use Postman:

```http
POST http://localhost:8080/api/admin/catalog/import-csv
Authorization: Bearer <admin-token>
Content-Type: multipart/form-data
file: <your.csv>
```

## Tips for real data

- Use your own product photos (Google Drive public link, Cloudinary, S3).
- Do not copy Flipkart/Amazon listings or images without permission.
- Keep one product per row; wrap descriptions in double quotes if they contain commas.
