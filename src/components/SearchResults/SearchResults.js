import React from "react";
import { Button, Header, List } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./SearchResults.css";

const SearchResults = ({
  results,
  onToggleDefinition,
  selectedDefinitions,
}) => {
  return (
    <div className="search-result">
      {results.map((result, i) => (
        <div key={result.word}>
          {i === 0 && (
            <div>
              <Header as="h3" style={{ padding: "20px 30px" }}>
                {result.word.toUpperCase()}
              </Header>
              <p style={{ padding: "0px 30px" }}>{result.phonetic}</p>
            </div>
          )}
          {result.meanings.map((meaning, index) => (
            <div key={index}>
              <Header
                as="h4"
                style={{
                  margin: "25px 35px 0px 35px",
                  color: "green",
                  fontSize: "20px",
                }}
              >
                {meaning.partOfSpeech}
              </Header>
              <List>
                {meaning.definitions.map((definition, index) => (
                  <List.Item
                    key={index}
                    style={{
                      marginLeft: "15px",
                      listStyle: "disc", // Use 'disc' for a filled circle, or 'circle' for an empty circle
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        margin: "5px 15px",
                      }}
                    >
                      <div style={{ padding: "5px" }}>
                        <p style={{ fontWeight: "bold" }}>
                          {definition.definition}
                        </p>
                        <p style={{ textDecoration: "underline" }}>
                          Sentence Example:{" "}
                          {definition.example
                            ? definition.example
                            : "No Sentence Example"}
                        </p>
                      </div>
                      <FontAwesomeIcon
                        icon={
                          selectedDefinitions.some(
                            (d) => d.id === definition.id
                          )
                            ? faMinus // Use the minus icon for Remove
                            : faPlus // Use the plus icon for Add
                        }
                        onClick={() => onToggleDefinition(definition)}
                        style={{
                          cursor: "pointer",
                          transform: "scale(2)",
                          margin: "5px",
                        }}
                      />
                    </div>
                  </List.Item>
                ))}
              </List>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
