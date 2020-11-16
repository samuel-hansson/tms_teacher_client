// In the renderer process.
const { desktopCapturer } = require('electron');
console.log("beginning capturing desktop");
desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
  for (const source of sources) {
    console.log("entering for");
    console.log(source.name);
    if (source.name === 'Entire Screen') {
        console.log("entering if to determine if Electron");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        });
        handleStream(stream);
      } catch (e) {
        handleError(e);
      }
      return;       //退出循环
    }
  }
});

function handleStream (stream) {
  console.log("handle stream funciton funning...");
  const video = document.querySelector('video');
  video.srcObject = stream;
  video.onloadedmetadata = (e) => video.play();
}

function handleError (e) {
  console.log(e)
}

const socket = io("http://localhost:3050");
// socket.open();

