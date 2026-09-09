# Terminal Music Player

A simple command-line music player for macOS, built with Node.js. The project is being developed incrementally, starting with the project setup and adding playback functionality in small, focused steps.

## Features

Implemented:

- Display a list of songs
- Navigate the song list with keyboard arrow keys
- Select and play a song

Planned:

- Pause and resume playback
- Play the next or previous song
- Skip forward or backward by 10 seconds
- Quit gracefully and clean up playback resources

## Planned Controls

These controls are available now:

- `↑` / `↓`: navigate songs
- `Enter`: select/play
- `Ctrl+C`: quit safely

These controls are planned but do not work yet:

- `Space`: play/pause
- `→`: skip forward 10 seconds
- `←`: skip backward 10 seconds
- `n`: next song
- `p`: previous song
- `q`: quit

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

Use `↑` / `↓` to highlight a song, then press `Enter` to play it. Press `Ctrl+C` to quit safely.

## Development Roadmap

1. Project initialization
2. Terminal music list
3. Arrow-key navigation
4. Song selection and playback
5. Pause/resume
6. Next/previous
7. 10-second seeking
8. Graceful quit and cleanup
9. Playback bug fixes
10. Documentation/polish

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

The player can now discover songs, navigate the list, and play the highlighted song. Pause/resume, next/previous, seeking, and further playback polish will be added incrementally in later commits.
