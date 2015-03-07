#Android Screen Share

- It is a dirty one day hack, so all the best.
- Works with linux
- Access and Control your android through browser (Chrome/Firefox)
- Support for Tap, Swipe, Text input, special buttons
- There is always a delay of 2-3 seconds between every action. Use VNC or something for a proper screen sharing
- Since the backend is a HTTP server, any device on the network can access it

##Requirements

- Linux
- Python (2.7+), web.py (pip2 install web)
- adb
- Debugging Mode enabled on your phone

##Usage

```bash
$ git clone 'https://github.com/nims11/AndroidScreenShare.git'
$ cd AndroidScreenShare
$ sudo python2 server.py
```
Open localhost:8080 on your browser
To stop the server through Ctrl+C, you might have to first close the app instance on the browser.
