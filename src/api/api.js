import axios from "axios";
import generateDefinitionId from "../utils/generateDefinitionId";

export const fetchWordDefinition = async (word) => {
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const data = response.data;

    return data.map((result) => ({
      word: result.word,
      phonetic: result.phonetic,
      meanings: result.meanings.map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((definition) => ({
          // Generate a unique ID for this definition
          id: generateDefinitionId(result.word, meaning.partOfSpeech, definition.definition),
          definition: definition.definition,
          example: definition.example,
          word: result.word
        })),
      })),
    }));  
  } catch (error) {
    console.error("Error fetching word definition:", error);
    return [];
  }
};
