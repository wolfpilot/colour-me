// Config
import { TERMS } from "../constants/terms";

// Cache all prefixed and non-prefixed objects
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const _getGrammar = () => {
  // Terms to match
  const formattedTerms = TERMS
    .map(term => term.name)
    .join(' | ');

  return `#JSGF V1.0; grammar colors; public <color> = ${formattedTerms};`;
};

export const getSpeechRecognition = () => {
  const recognition = new SpeechRecognition();
  const grammarList = new SpeechGrammarList();

  const grammar = _getGrammar();

  // Add custom grammar to the list
  grammarList.addFromString(grammar, 1);

  // Customize speech recognition
  Object.assign(recognition, {
    grammars: grammarList,
    lang: 'en-US',
    interimResults: false,
    maxAlternatives: 1
  });

  return recognition;
};
