# PartVault

انبار قطعات الکترونیک برای ویندوز: ثبت قطعه، باکس‌بندی با کد، جستجوی سریع، هشدار کم‌موجودی، موجودی تقریبی (فراوان / متوسط / کم) و ورود/خروج CSV برای اکسل.

A dark-themed desktop inventory for electronic components (Electron, single `index.html`, works offline).

## Features

- Parts with category, package, exact quantity or approximate level (plenty / medium / low / out), minimum stock alert, part number and datasheet link
- Boxes with codes (`R-01`, `C-01`, `U-01`, ...), title and location
- Instant search across every field, filters by category and box, sorting
- CSV export and import (Excel friendly, Persian supported); import merges parts with the same name, package and box
- Data is stored locally on the computer (Electron local storage), no internet needed

## Run from source

```bash
npm install
npm start
```

## Build the Windows portable exe

```bash
npm run build
```

The exe is written to `dist/PartVault.exe`.

## Author

Mehdi Ghanbarian, Embedded Systems Engineer
