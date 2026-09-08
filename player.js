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

  console.log('🎵 Terminal Music Player\n');
  console.log('Available Songs:\n');

  if (songs.length === 0) {
    console.log('No playable songs found.');
  } else {
    songs.forEach((song, index) => {
      console.log(`${index + 1}. ${formatSongName(song)}`);
    });
  }

  console.log('\nNavigation and playback coming next...');
}

displaySongs();
