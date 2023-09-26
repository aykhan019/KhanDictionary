import React from "react";
import "./DocumentEditor.css";
import { Header } from "semantic-ui-react";
import intToRoman from "../../utils/intToRoman";

const DocumentEditor = ({ selectedDefinitions, fontFamily }) => {
  const documentStyle = {
    fontFamily: fontFamily,
  };

  return (
    <div className="document-editor">
      <Header as="h1" textAlign="center">
        Vocabulary
      </Header>
      <div className="formatted-text" style={documentStyle}>
        {selectedDefinitions &&
          selectedDefinitions.map((definition, index) => (
            <div key={index}>
              <FormattedDefinition
                rank={index + 1}
                definition={definition}
                documentStyle={documentStyle}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

const FormattedDefinition = ({ rank, definition,documentStyle }) => {
  if (!definition) {
    return null; // Skip empty
  }

  return (
    <div className="formatted-definition">
      <p>
        <span style={{ fontWeight: "bold", fontFamily: documentStyle.fontFamily }}> {intToRoman(rank)} {")"} </span>

        <span style={{ fontWeight: "bold", color: "green", textTransform: "capitalize", fontFamily: documentStyle.fontFamily}}> {definition.word} </span>

        <span style={{ fontWeight: "bold", fontFamily: documentStyle.fontFamily }}> - </span>

        <span style={{ fontWeight: "bold", fontFamily: documentStyle.fontFamily }}>{definition.definition}</span>
      </p>

      {definition.example && (
        <p>
          <span style={{ textDecoration: "underline", fontFamily: documentStyle.fontFamily }}>
            Sentence Example - {definition.example}
          </span>
        </p>
      )}
    </div>
  );
};

export default DocumentEditor;
