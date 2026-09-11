const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const Mpv = require('node-mpv');

const songsDirectory = path.join(__dirname, 'songs');
const playableExtensions = new Set(['.mp3', '.m4a', '.wav', '.aiff', '.aac', '.flac', '.ogg']);

function formatSongName(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

let audioPlayer = null;
let playingIndex = null;
let paused = false;
let playbackMessage = '';

function renderSongs(songs, selectedIndex) {
  process.stdout.write('\x1b[2J\x1b[H');
  console.log('🎵 Terminal Music Player\n');

  songs.forEach((song, index) => {
    const marker = index === selectedIndex ? '>' : ' ';
    const state = index === playingIndex ? (paused ? ' (paused)' : ' (playing)') : '';
    console.log(`${marker} ${formatSongName(song)}${state}`);
  });

  if (playbackMessage) {
    console.log(`\n${playbackMessage}`);
  }

  console.log('\n↑/↓ to navigate');
  console.log('Press Ctrl+C to quit');
}

function stopPlayback() {
  if (audioPlayer) {
    try {
      audioPlayer.quit();
    } catch (error) {
      // The player may already have stopped.
    }
    audioPlayer = null;
  }
  playingIndex = null;
  paused = false;
}

function playSong(songs, selectedIndex) {
  const songPath = path.join(songsDirectory, songs[selectedIndex]);

  if (!fs.existsSync(songPath)) {
    playbackMessage = 'The selected audio file could not be found.';
    renderSongs(songs, selectedIndex);
    return;
  }

  if (spawnSync('mpv', ['--version'], { stdio: 'ignore' }).status !== 0) {
    playbackMessage = 'MPV is not installed. Install it with: brew install mpv';
    renderSongs(songs, selectedIndex);
    return;
  }

  try {
    if (audioPlayer) {
      audioPlayer.stop();
    } else {
      audioPlayer = new Mpv({ audio_only: true });
    }
    playingIndex = selectedIndex;
    paused = false;
    playbackMessage = `Playing: ${formatSongName(songs[selectedIndex])}`;
    renderSongs(songs, selectedIndex);
    audioPlayer.load(songPath);
  } catch (error) {
    stopPlayback();
    playbackMessage = 'The selected song could not be played.';
    renderSongs(songs, selectedIndex);
  }
}

function togglePause(songs, selectedIndex) {
  if (!audioPlayer || playingIndex === null) {
    playbackMessage = 'No song is playing.';
    renderSongs(songs, selectedIndex);
    return;
  }

  try {
    if (paused) {
      audioPlayer.play();
      paused = false;
      playbackMessage = `Playing: ${formatSongName(songs[playingIndex])}`;
    } else {
      audioPlayer.pause();
      paused = true;
      playbackMessage = `Paused: ${formatSongName(songs[playingIndex])}`;
    }
  } catch (error) {
    playbackMessage = 'The playback state could not be changed.';
  }

  renderSongs(songs, selectedIndex);
}

function seekSong(songs, selectedIndex, seconds) {
  if (!audioPlayer || playingIndex === null) {
    playbackMessage = 'No song is playing.';
    renderSongs(songs, selectedIndex);
    return;
  }

  try {
    audioPlayer.seek(seconds);
    playbackMessage = seconds > 0 ? 'Skipped forward 10 seconds.' : 'Skipped backward 10 seconds.';
  } catch (error) {
    playbackMessage = 'The song could not be repositioned.';
  }

  renderSongs(songs, selectedIndex);
}

function changeSong(songs, selectedIndex, direction) {
  const nextIndex = selectedIndex + direction;

  if (nextIndex < 0) {
    playbackMessage = 'Already at the first song.';
    renderSongs(songs, selectedIndex);
    return selectedIndex;
  }

  if (nextIndex >= songs.length) {
    playbackMessage = 'Already at the last song.';
    renderSongs(songs, selectedIndex);
    return selectedIndex;
  }

  playSong(songs, nextIndex);
  return nextIndex;
}

function startNavigation(songs) {
  let selectedIndex = 0;

  renderSongs(songs, selectedIndex);

  if (!process.stdin.isTTY) {
    return;
  }

  process.stdin.setRawMode(true);
  process.stdin.setEncoding('utf8');
  process.stdin.resume();

  process.stdin.on('data', (key) => {
    if (key === '\u0003') {
      process.stdin.setRawMode(false);
      stopPlayback();
      process.exit();
    }

    if (key === '\u001b[A') {
      selectedIndex = Math.max(0, selectedIndex - 1);
    }

    if (key === '\u001b[B') {
      selectedIndex = Math.min(songs.length - 1, selectedIndex + 1);
    }

    if (key === '\r') {
      playSong(songs, selectedIndex);
      return;
    }

    if (key === ' ') {
      togglePause(songs, selectedIndex);
      return;
    }

    if (key === 'n') {
      selectedIndex = changeSong(songs, selectedIndex, 1);
      return;
    }

    if (key === 'p') {
      selectedIndex = changeSong(songs, selectedIndex, -1);
      return;
    }

    if (key === '\u001b[C') {
      seekSong(songs, selectedIndex, 10);
      return;
    }

    if (key === '\u001b[D') {
      seekSong(songs, selectedIndex, -10);
      return;
    }

    renderSongs(songs, selectedIndex);
  });
}

function displaySongs() {
  let songs;

  try {
    songs = fs
      .readdirSync(songsDirectory)
      .filter((filename) => playableExtensions.has(path.extname(filename).toLowerCase()))
      .sort();
  } catch (error) {
    console.log('The songs directory could not be found.');
    return;
  }

  if (songs.length === 0) {
    console.log('🎵 Terminal Music Player\n');
    console.log('No playable songs found.');
    return;
  }

  startNavigation(songs);
}

displaySongs();
