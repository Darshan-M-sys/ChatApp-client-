# ChatApp — Client (Common setup)

Overview
This folder contains the React client for ChatApp. It's a Create React App project with Tailwind CSS prepared and Socket.IO client dependency for realtime features.

Prerequisites
- Node.js (>=16) and npm installed

Quick setup (first commit)
1. Install dependencies:

```bash
cd client/chatapp
npm install
```

2. Development run:

```bash
npm start
```

3. Build for production:

```bash
npm run build
```

Notes
- Dev scripts provided by `react-scripts` (`start`, `build`, `test`, `eject`).
- Tailwind is installed as a dev dependency; follow `tailwind.config.js` and `postcss.config.js` for customization.
- Socket.IO client is included for realtime messaging.

Suggested initial commit message

```
chore(client): initial client scaffold

- Add Create React App scaffold
- Install Tailwind, PostCSS and Socket.IO client
- Add initial components and assets
```

Suggested next steps
- Configure environment variables for API base URL (if needed).
- Wire Socket.IO events and auth flows with the backend.
- Add linting and format scripts.
