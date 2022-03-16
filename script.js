const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// VoiceRSS JS SDK - voice.js

//Disable/Enable Button
function toggleButton() {
  // if true = false ; if false = true
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "4bdc66adac684086a532e1819ae5d262",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=racist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    //  Disable Button
    toggleButton();
  } catch (error) {
    console.log("whoops", error);
  }
}

// Event Listners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
