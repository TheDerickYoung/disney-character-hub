import React from "react";

const CardsList = ({ filteredCharacters }) => {
    return (
      <div className="cards-list">
        {filteredCharacters.length === 0 ? (
          <p className="sorry-message">Sorry, no characters found.</p>
        ) : (
          filteredCharacters.map((character) => (
            <div key={character._id} className="monster-card">
              <div className="img-container">
                  <img src={character.imageUrl} alt={character.name} className="character-img" />
              </div>
              <h1 className="character-name">{character.name}</h1>
              <p>{character.films.length === 0 ? '' : <strong> Featured Films:</strong>} {character.films.join(", ")}</p>
              <p>{character.tvShows.length === 0 ? '' : <strong> Featured Films:</strong>} {character.tvShows.join(", ")}</p>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default CardsList;