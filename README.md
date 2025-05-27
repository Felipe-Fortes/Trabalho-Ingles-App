# Calendar App

A desktop calendar application built with React, Electron, and Material-UI that helps you manage your schedule with written and voice notes.

## Features

- 📅 Interactive calendar view with month, week, and day views
- 📝 Written notes functionality
- 🎤 Voice recording capabilities
- 🌓 Dark/Light theme support
- 🗑️ Easy event management with delete functionality
- 💻 Desktop application with native feel

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd calendar-app
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run electron-dev
```

4. Build the application:
```bash
npm run electron-pack
```

The installer will be created in the `dist` folder.

## Usage

- Click on any date in the calendar to create a new event
- Add written notes using the notes panel
- Record voice notes using the voice recording feature
- Toggle between dark and light themes using the theme button
- Delete events using the trash can icon next to each event

## Technologies Used

- React
- TypeScript
- Electron
- Material-UI
- React Big Calendar
- React Media Recorder

## Development

To start development:

1. Run the development server:
```bash
npm run electron-dev
```

2. Make your changes
3. Test the application
4. Build for production:
```bash
npm run electron-pack
```

## License

MIT License 