const fs = require('fs');
const path = require('path');

const songsDirectory = path.join(__dirname, 'songs');
const playableExtensions = new Set(['.mp3', '.m4a', '.wav', '.aiff', '.aac', '.flac', '.ogg']);

function formatSongName(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderSongs(songs, selectedIndex) {
  process.stdout.write('\x1b[2J\x1b[H');
  console.log('🎵 Terminal Music Player\n');

  songs.forEach((song, index) => {
    const marker = index === selectedIndex ? '>' : ' ';
    console.log(`${marker} ${formatSongName(song)}`);
  });

  console.log('\n↑/↓ to navigate');
  console.log('Press Ctrl+C to quit');
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
      process.exit();
    }

    if (key === '\u001b[A') {
      selectedIndex = Math.max(0, selectedIndex - 1);
    }

    if (key === '\u001b[B') {
      selectedIndex = Math.min(songs.length - 1, selectedIndex + 1);
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
