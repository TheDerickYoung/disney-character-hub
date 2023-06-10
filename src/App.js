import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import CardsList from "./components/cards-list/cards-list.components.jsx";
import SearchBar from "./components/search-bar/search-bar.components.jsx";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const fetchDisneyCharacters = () => {
    const URL = "https://api.disneyapi.dev/character?pageSize=7450";
    axios.get(URL).then((res) => {
      console.log(res.data.data);
      console.log(res.data.data[0].name);
      setCharacters(res.data.data);
    });
  };

  useEffect(() => {
    fetchDisneyCharacters();
  }, []);

  useEffect(() => {
    const newFilteredCharacters = characters.filter((character) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase();
      const lowerCaseName = character.name.toLowerCase();
      const lowerCaseFilmTitles = character.films.map((film) => film.toLowerCase());
      const lowerCaseTVShowTitles = character.tvShows.map((tvShow) => tvShow.toLowerCase());

      return (
        lowerCaseName.includes(lowerCaseSearchQuery) ||
        lowerCaseFilmTitles.includes(lowerCaseSearchQuery) ||
        lowerCaseTVShowTitles.includes(lowerCaseSearchQuery) ||
        character.films.some((film) => film.toLowerCase().includes(lowerCaseSearchQuery))
      );
    });
    setFilteredCharacters(newFilteredCharacters);
  }, [characters, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="title-container">
          <img
            src="./disney-logo1.png"
            alt="Disney Characters Rolodex logo."
            className="logo"
          />
        </div>
        <SearchBar
          handleSearchChange={handleSearchChange}
          placeholder="Search Disney characters, films, or TV shows..."
          className="search-bar"
        />
        <CardsList filteredCharacters={filteredCharacters} />
        <h2 className="creator">
          Created by{" "}
          <a
            href="https://derickyoungjr.com/"
            target="_blank"
            className="creator"
          >
            Derick Young Jr.
          </a>
        </h2>
      </div>
    </>
  );
}