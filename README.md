# [ColourMe](https://wolfpilot-colour-me.onrender.com/)

![demo](demo.gif)

A simple speech-to-text app that changes background colour by voice.

Set up using Express and Webpack from scratch.

Due to the size and goal of this project, I didn't implement SASS or work on a responsive solution. This app is best experienced on Chrome on a Mac or Windows machine.

Please allow 10 - 15 seconds for the app to load as free web dynos on Render go to sleep after 30 minutes of inactivity.

## Demo

Click the title or check it out at https://wolfpilot-colour-me.onrender.com/

## Features

- App hosted on secure server (HTTPS), so you'll only need to accept the microphone permissions once.
- Debugging mode shows logs confidence levels, transcript and errors.
- Implements the JS [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) to stop listening for voice when focusing on other browser tabs.
- Uses CSS `mix-blend-mode` to add some spark and shine to the whole thing.

## Support

This project features a few experimental technologies and thus is only supported by **Chrome and Edge**.

- Browser compatibility [table](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/error_event#browser_compatibility)
- Brave [issue](https://github.com/brave/brave-browser/issues/3725) tracker
