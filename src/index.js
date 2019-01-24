// Cache all prefixed and non-prefixed objects
const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const getGrammar = () => {
  // Terms to match
  const terms = ['red', 'green', 'blue'];
  const formattedTerms = terms.join(' | ');

  return `#JSGF V1.0; grammar colors; public <color> = ${formattedTerms};`;
};

const getRecognition = () => {
  const recognition = new SpeechRecognition();
  const grammarList = new SpeechGrammarList();

  const grammar = getGrammar();

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

const bindListeners = () => {
  const recognition = getRecognition();

  recognition.start();

  recognition.onresult = event => {
    console.log('You said: ', event.results[0][0].transcript);
  };
};

const init = () => {
  if (!SpeechRecognition) {
    console.error('Speech recognition not supported, sorry!');

    return;
  }

  bindListeners();
};

init();
