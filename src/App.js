import React, { useState } from "react";
import { Grid, Loader, Header, Dropdown, Button } from "semantic-ui-react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import DocumentEditor from "./components/DocumentEditor/DocumentEditor";
import { fetchWordDefinition } from "./api/api";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDefinitions, setSelectedDefinitions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fontFamily, setFontFamily] = useState("Segoe Print"); // Initial font family

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);

    try {
      const results = await fetchWordDefinition(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching word definition:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDefinitionInDocument = (definition) => {
    if (selectedDefinitions.some((d) => d.id === definition.id)) {
      // Remove the definition from selectedDefinitions
      setSelectedDefinitions((prevDefinitions) =>
        prevDefinitions.filter((d) => d.id !== definition.id)
      );
    } else {
      // Add the definition to selectedDefinitions
      setSelectedDefinitions((prevDefinitions) => [
        ...prevDefinitions,
        definition,
      ]);
    }
  };

  const handleSaveDocument = async () => {
   
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header
        as="h1"
        className="header"
        style={{
          height: "60px",
          background: "#333",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        KhanDictionary
        <div
          className="header-right"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <Dropdown
            placeholder="Font Family"
            selection
            className="smaller-dropdown"
            options={[
              { key: "Segoe Print", text: "Segoe Print", value: "Segoe Print" },
              { key: "Arial", text: "Arial", value: "Arial" },
              {
                key: "Times New Roman",
                text: "Times New Roman",
                value: "Times New Roman", 
              },
              { key: "Verdana", text: "Verdana", value: "Verdana" },
              { key: "Helvetica", text: "Helvetica", value: "Helvetica" },
              { key: "Georgia", text: "Georgia", value: "Georgia" },
              { key: "Courier New", text: "Courier New", value: "Courier New" },
              {
                key: "Trebuchet MS",
                text: "Trebuchet MS",
                value: "Trebuchet MS",
              },
              { key: "Palatino", text: "Palatino", value: "Palatino" },
              {
                key: "Comic Sans MS",
                text: "Comic Sans MS",
                value: "Comic Sans MS",
              },
            ]}
            value={fontFamily}
            onChange={(event, { value }) => {
              setFontFamily(value);
            }}
          />
          <Button primary onClick={handleSaveDocument}>
            Save Document
          </Button>
        </div>
      </Header>

      {/* Content */}
      <Grid columns={2} stackable className="grid">
        <Grid.Column className="my-column">
          <div className="left-side side">
            <SearchBar onSearch={handleSearch} />
            {isLoading ? (
              <Loader active>Loading...</Loader>
            ) : (
              <SearchResults
                results={searchResults}
                onToggleDefinition={toggleDefinitionInDocument}
                selectedDefinitions={selectedDefinitions}
              />
            )}
          </div>
        </Grid.Column>
        <Grid.Column className="my-column">
          <div className="right-side side">
            <DocumentEditor
              selectedDefinitions={selectedDefinitions}
              fontFamily={fontFamily}
            />
          </div>
        </Grid.Column>
      </Grid>

      {/* Footer */}
      <div className="footer">
        <p>
          Copyright © Aykhan Ahmadzada 2023 -{" "}
          <a
            href="https://aykhan.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            aykhan.net
          </a>
        </p>
        <p>
          Explore available dictionaries{" "}
          <a
            href="https://data.aykhan.net/data/sat/dictionaries/all-dictionaries.zip"
            target="_blank"
            download={true}
            className="all-dictionaries-link"
            style={{ textDecoration: "underline" }}
            rel="noopener noreferrer"
          >
            here
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
