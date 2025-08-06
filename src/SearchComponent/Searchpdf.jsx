import React, { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.mjs";

const Searchpdf = () => {
  const [fiches, setFiches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/api/getFiches")
      .then((res) => res.json())
      .then((data) => setFiches(data))
      .catch((err) => console.error("Failed to fetch fiches", err));
  }, []);

  const extractTextFromPDF = async (url) => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ");
    }

    return text;
  };

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (!term) {
      setSearchResults([]);
      return;
    }

    const results = [];

    for (const fiche of fiches) {
      const ficheUrl = `http://localhost:8081${fiche.ficheFile}`; // PDF file URL
      try {
        const text = await extractTextFromPDF(ficheUrl);
        if (text.toLowerCase().includes(term.toLowerCase())) {
          results.push({
            niveauID: fiche.niveauID,
            etablissementNom: fiche.etablissementNom,
            url: ficheUrl,
          });
        }
      } catch (err) {
        console.error(`Failed to read ${fiche.ficheFile}`, err);
      }
    }

    setSearchResults(results);
  };

  return (
    <div>
      <h2>Rechercher dans les fiches</h2>
      <input
        type="text"
        placeholder="Ex: Almofid..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {searchResults.map((fiche, index) => (
          <li key={index}>
            <a href={fiche.url} target="_blank" rel="noreferrer">
              {fiche.url}
            </a>
            <p>{fiche.etablissementNom}</p>
            <p>{fiche.niveauID}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Searchpdf;
