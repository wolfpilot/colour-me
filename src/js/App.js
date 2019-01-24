// Utils
import { getSpeechRecognition } from "./utils/speech";

// Config
import { TERMS } from "./constants/terms";

const defaults = {
  autoRestart: true,
  minConfidence: 0.7
};

class App {
  state = {
    lastStartedAt: 0
  };

  /**
   * @NOTE: Shamelessly plugged from Tal Ater's "annyang" library as detailed on StackOverflow. Thank you!
   * @NOTE: URL: https://stackoverflow.com/a/30007684/4980568
   * @private
   */
  _restartSpeechRecognition() {
    const timeSinceLastStart = new Date().getTime() - this.state.lastStartedAt;

    // Throttle restart to a minimum of 1 second
    if (timeSinceLastStart < 1000) {
      setTimeout(() => {
        this._setupSpeechRecognition();
      }, 1000 - timeSinceLastStart);
    } else {
      this._setupSpeechRecognition();
    }
  }

  /**
   * @param {String} transcript - The speech-to-text value that was recorded
   * @private
   */
  _handleTranscript(transcript) {
    this._elems.transcript.textContent = `You said: ${transcript}`;

    if (TERMS.includes(transcript)) {
      this._elems.body.style.backgroundColor = transcript;
      this._elems.error.textContent = '';
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
    const _recognition = getSpeechRecognition();

    _recognition.start();

    _recognition.onresult = event => {
      const _result = event.results[0][0];
      const _transcript = _result.transcript.toLowerCase();
      const _confidence = _result.confidence;

      this._handleConfidence(_confidence);
      this._handleTranscript(_transcript);
    };

    _recognition.onspeechend = () => {
      _recognition.stop();

      // Restart speech recognition automatically
      if (defaults.autoRestart) {
        this._restartSpeechRecognition();
      }
    };

    _recognition.onnomatch = () => {
      this._elems.error.textContent = "Speech not recognized.";
    };

    _recognition.onerror = event => {
      if (event.error === 'no-speech') {
        this._restartSpeechRecognition();

        return;
      }

      this._elems.error.textContent = "Error occurred in recognition: " + event.error;
    };

    this.state.lastStartedAt = new Date().getTime();
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
   * @public
   */
  init() {
    this._cacheSelectors();

    if (!getSpeechRecognition()) {
      this._elems.error.textContent = "Speech recognition not supported, sorry!";

      return;
    }

    this._setupTerms();
    this._setupSpeechRecognition();
  }
}

export default App;
