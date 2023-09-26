// Function to generate a unique ID for a definition
export default function generateDefinitionId(word, partOfSpeech, definition) {
  return `${word}_${partOfSpeech}_${definition}`;
}