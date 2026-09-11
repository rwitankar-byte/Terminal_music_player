# Terminal Music Player

A simple command-line music player for macOS, built with Node.js and MPV. It discovers audio files from `songs/` and provides keyboard controls for playback.

## Features

Implemented:

- Display a list of songs
- Navigate the song list with keyboard arrow keys
- Select and play a song
- Pause and resume playback
- Play the next or previous song
- Skip forward or backward by 10 seconds
- Quit gracefully and clean up playback resources

## Controls

```text
↑ / ↓   Navigate songs
Enter   Play selected song
Space   Pause / Resume
n       Next song
p       Previous song
→       Forward 10 seconds
←       Backward 10 seconds
q       Quit
Ctrl+C  Quit
```

## Requirements

- macOS
- Node.js
- npm
- MPV

The player uses the Node.js `node-mpv` package, which requires the MPV command-line player.

Install MPV on macOS with Homebrew:

```bash
brew install mpv
```

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/rwitankar-byte/Terminal_music_player.git
cd Terminal_music_player
npm install
```

## Usage

Start the player with:

```bash
npm start
```

Use `↑` / `↓` to highlight a song, then press `Enter` to play it. `Space` pauses and resumes the same MPV playback instance. `n` and `p` switch tracks, while `←` and `→` seek by 10 seconds. Seeking stays within the song boundaries. Press `q` or `Ctrl+C` to quit safely.

## Playback Behavior

- Songs are discovered from the `songs/` directory at startup.
- Only supported audio extensions are shown; non-audio files are ignored.
- Selecting another song stops the current track and starts the new one from the beginning.
- Pause/resume and seeking reuse the same playback instance.
- MPV is stopped and the terminal input mode is restored when quitting.

## Development Roadmap

1. Project initialization — complete
2. Terminal music list — complete
3. Arrow-key navigation — complete
4. Song selection and playback — complete
5. Pause/resume — complete
6. Next/previous — complete
7. 10-second seeking — complete
8. Graceful quit and cleanup — complete
9. Playback bug fixes — complete
10. Documentation/polish — complete

## Project Structure

```text
.
├── player.js      # Application entry point and player logic
├── package.json   # Project metadata and npm scripts
├── .gitignore     # Files ignored by Git
├── songs/         # Audio files available to the player
└── README.md      # Project documentation
```

The `songs/` directory contains the audio files discovered and played by the application.

## Current Status

The core CLI music player is complete. It discovers songs, supports keyboard navigation, plays and controls audio through MPV, and cleans up playback processes on exit.
