// Utils
import { getSpeechRecognition } from "./utils/speech";

// Config
import { TERMS } from "./constants/terms";

const defaults = {
  minConfidence: 0.7
};

class App {
  /**
   * @param {String} transcript - The speech-to-text value that was recorded
   * @private
   */
  _handleTranscript(transcript) {
    this._elems.transcript.textContent = `You said: ${transcript}`;

    if (TERMS.includes(transcript)) {
      this._elems.body.style.backgroundColor = transcript;
    } else {
      this._elems.error.textContent = "I didn't recognise that color.";
    }
  }

  /**
   * @param {Number} confidence - The accuracy of the perceived speech
   * @Note: Has a value of 0 (least) to 1 (most) accurate
   * @private
   */
  _handleConfidence(confidence) {
    const _confidencePercentage = confidence.toFixed(2) * 100;

    this._elems.confidence.textContent = `Confidence: ${_confidencePercentage}%`;

    if (confidence < defaults.minConfidence) {
      this._elems.error.textContent = "Sorry, can you please repeat?";
    }
  }

  /**
   * Initialise the speech recognition listeners
   * @private
   */
  _setupSpeechRecognition() {
    this._recognition.start();

    this._recognition.onresult = event => {
      const _result = event.results[0][0];
      const _transcript = _result.transcript.toLowerCase();
      const _confidence = _result.confidence;

      this._handleConfidence(_confidence);
      this._handleTranscript(_transcript);
    };

    this._recognition.onspeechend = () => {
      this._recognition.stop();
    };

    this._recognition.onnomatch = () => {
      this._elems.error.textContent = "Speech not recognized.";
    };

    this._recognition.onerror = event => {
      this._elems.error.textContent = "Error occurred in recognition: " + event.error;
    };
  }

  /**
   * Inject the given term elements
   * @private
   */
  _setupTerms() {
    const _frag = document.createDocumentFragment();

    TERMS.forEach(term => {
      const elem = document.createElement('li');

      elem.classList = 'term';
      elem.textContent = term;
      elem.style.backgroundColor = term;

      _frag.appendChild(elem);
    });

    this._elems.termList.appendChild(_frag);
  }

  /**
   * Cache DOM elements
   * @private
   */
  _cacheSelectors() {
    this._elems = {
      body: document.getElementsByTagName('body')[0],
      termList: document.getElementById('term-list'),
      confidence: document.getElementById('output-confidence'),
      transcript: document.getElementById('output-transcript'),
      error: document.getElementById('output-error')
    };
  }

  /**
   * Setup useful parameters
   * @private
   */
  _setupParams() {
    this._recognition = getSpeechRecognition();
  }

  /**
   * @public
   */
  init() {
    this._setupParams();
    this._cacheSelectors();

    if (!this._recognition) {
      this._elems.error.textContent = "Speech recognition not supported, sorry!";

      return;
    }

    this._setupTerms();
    this._setupSpeechRecognition();
  }
}

export default App;
