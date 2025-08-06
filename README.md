# search-from-pdf

🔍 React PDF Search App — A web application built with React.js that allows users to search inside educational PDF documents hosted on a local XAMPP server. It uses pdfjs-dist to extract and search PDF content in real-time and displays clickable links to matching files.

---

````markdown
# 📚 React PDF Search App

This project is a React.js web application that allows users to **search through educational PDF documents** (fiches) stored on a local XAMPP server. Users can search for terms like “Almofid” and get clickable links to the PDF files that contain matching content.

---

## 🔧 Features

- 🔍 Search through content of multiple PDF files in real-time
- 📂 Files are stored in a `fiches/` directory served by XAMPP (Apache)
- 🌐 Metadata of PDF files is loaded from an API (`http://localhost:8081/api/fiches`)
- 🧠 Uses `pdfjs-dist` to extract and search PDF text client-side
- 🖱 Clickable links to open the matching PDFs

---

## 📁 Project Structure

```bash
my-app/
├── public/
│   └── index.html
├── src/
│   ├── Searchpdf.jsx       # Main search component
│   └── App.jsx             # App wrapper
├── package.json
└── README.md               # You're here
```
````

---

## ⚙️ Prerequisites

- Node.js (v16+)
- npm
- XAMPP (Apache + PHP)
- PDF files in `C:/xampp/htdocs/fiches`
- An API endpoint at `http://localhost:8081/api/fiches` returning:

```json
[{ "nom": "Almofid_Math.pdf" }, { "nom": "Science_Fiche1.pdf" }]
```

---

## 🧪 Installation

### 1. Clone the project

```bash
git clone https://github.com/your-username/pdf-search-app.git
cd pdf-search-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the React app

```bash
npm run dev
```

> Default port: `http://localhost:5173`

### 4. Serve PDFs via XAMPP

Make sure you place all your `.pdf` files in:

```
C:/xampp/htdocs/fiches
```

You should be able to access a file like this:

```
http://localhost/fiches/Almofid_Math.pdf
```

### 5. Backend API (PHP example)

Ensure `http://localhost:8081/api/fiches` returns a JSON list of PDF filenames from the `fiches` folder.

Example PHP:

```php
<?php
$files = array_diff(scandir('../fiches'), array('.', '..'));
$response = array_map(function($file) {
    return ['nom' => $file];
}, $files);
header('Content-Type: application/json');
echo json_encode($response);
?>
```

---

---

## 📦 Dependencies

- [React.js](https://reactjs.org/)
- [pdfjs-dist](https://github.com/mozilla/pdfjs-dist)

---

## 💡 Notes

- This method extracts all text from each PDF at runtime — it may be slow with large numbers of files. For production, consider extracting and indexing text on the backend.

## 🧑‍💻 Author

**Abdelmalek Eddiry** — [@3bdee](https://github.com/3bdee)




