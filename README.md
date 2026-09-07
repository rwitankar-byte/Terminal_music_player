# Terminal Music Player

A simple command-line music player for macOS, built with Node.js. The project is being developed incrementally, starting with the project setup and adding playback functionality in small, focused steps.

## Features

The following features are planned but are not implemented yet:

- Display a list of songs
- Navigate the song list with keyboard arrow keys
- Select and play a song
- Pause and resume playback
- Play the next or previous song
- Skip forward or backward by 10 seconds
- Quit gracefully and clean up playback resources

## Planned Controls

These controls are planned and do not work yet:

- `↑` / `↓`: navigate songs
- `Enter`: select/play
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

Additional requirements, if any, will be documented after the audio library is selected.

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

The project is currently only initialized. Playback, song selection, keyboard controls, and terminal interaction have not been implemented yet.

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
├── player.js      # Initial application entry point
├── package.json   # Project metadata and npm scripts
├── .gitignore     # Files ignored by Git
└── README.md      # Project documentation
```

Audio files may be kept in the `songs/` directory during development.

## Current Status

This is the initial project setup. The actual music player functionality will be added incrementally in later commits.
