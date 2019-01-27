// Config
import { TERMS } from "./constants/terms";

// Utils
import { getSpeechRecognition } from "./utils/speech";

const defaults = {
  autoRestart: true,
  minConfidenceThreshold: 0.7
};

class App {
  state = {
    isPaused: 0,
    lastStartedAt: 0,
    confidence: 0,
    transcript: ''
  };

  /**
   * @NOTE: Shamelessly plugged from Tal Ater's "annyang" library as detailed on StackOverflow. Thank you!
   * @NOTE: URL: https://stackoverflow.com/a/30007684/4980568
   * @private
   */
  _restart() {
    const timeSinceLastStart = new Date().getTime() - this.state.lastStartedAt;

    // Throttle restart to a minimum of 1 second
    if (timeSinceLastStart < 1000) {
      setTimeout(() => {
        this._initRecognition();
      }, 1000 - timeSinceLastStart);
    } else {
      this._initRecognition();
    }
  }

  /**
   * @private
   */
  _handleSpeechResults() {
    // Check confidence threshold
    if (this.state.confidence < defaults.minConfidenceThreshold) {
      this._elems.error.textContent = "Sorry, can you please repeat?";

      return;
    }

    // Check whether transcript matches any term
    const match = TERMS.find(term => term.name === this.state.transcript);

    if (match) {
      this._elems.overlay.style.backgroundColor = `#${match.hex}`;

      this._elems.error.textContent = '';
    } else {
      this._elems.error.textContent = "I didn't recognise that term.";
    }
  }

  /**
   * @private
   */
  _showSpeechResults() {
    const _confidencePercentage = this.state.confidence.toFixed(2) * 100;

    this._elems.confidence.textContent = `Confidence: ${_confidencePercentage}%`;
    this._elems.transcript.textContent = `You said: ${this.state.transcript}`;
  }

  /**
   * Initialise the speech recognition listeners
   * @private
   */
  _initRecognition() {
    this._recognition = getSpeechRecognition();

    this._recognition.start();

    this._recognition.onresult = event => {
      const _result = event.results[0][0];

      this.state.confidence = _result.confidence;
      this.state.transcript = _result.transcript.toLowerCase();

      this._showSpeechResults();
      this._handleSpeechResults();
    };

    this._recognition.onspeechend = () => {
      this._recognition.stop();

      // Restart speech recognition automatically
      if (defaults.autoRestart && !this.state.isPaused) {
        this._restart();
      }
    };

    this._recognition.onnomatch = () => {
      this._elems.error.textContent = "Speech not recognized.";
    };

    this._recognition.onerror = event => {
      if (event.error === 'no-speech') {
        this._restart();

        return;
      }

      this._elems.error.textContent = "Error occurred in recognition: " + event.error;
    };

    this.state.lastStartedAt = new Date().getTime();
  }

  /**
   * @param {Object} e - The 'mousemove' event
   * @private
   */
  _handleMouseMove= e => {
    // Resize the overlay element based on the mouse position
    const _bounds = this._elems.body.getBoundingClientRect();
    const _position = ((e.pageX - _bounds.left) / this._elems.body.offsetWidth) * 100;

    if (_position <= 100) {
      this._elems.overlay.style.maxWidth = `${_position}%`;
    }
  };

  /**
   * @private
   */
  _pause() {
    this.state.isPaused = true;

    this._recognition.stop();
  }

  /**
   * @private
   */
  _start() {
    this.state.isPaused = false;

    this._initRecognition();
  }

  /**
   * Handle user changing to other browser tabs
   * @private
   */
  _handleVisibilityChange = () => {
    document.hidden ? this._pause() : this._start();
  };

  /**
   * @private
   */
  _bindListeners() {
    document.addEventListener('visibilitychange', this._handleVisibilityChange);

    window.addEventListener("mousemove", this._handleMouseMove);
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
      elem.textContent = term.name;
      elem.style.backgroundColor = `#${term.hex}`;

      _frag.appendChild(elem);
    });

    this._elems.termList.appendChild(_frag);
  }

  /**
   * @private
   */
  _cacheSelectors() {
    this._elems = {
      body: document.getElementsByTagName('body')[0],
      termList: document.getElementById('term-list'),
      overlay: document.getElementById('overlay'),
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
    this._bindListeners();
    this._initRecognition();
  }
}

export default App;
