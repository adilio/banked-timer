# Days Since Getting #BANKED Timer

A sleek React countdown timer with mechanical flip-clock animations tracking time since getting #BANKED.  
Repo: https://github.com/adilio/banked-timer  
Live: https://adilio.github.io/banked-timer/

![Timer Preview](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)

## Features

- **Mechanical Flip Counter** - Authentic flip-clock animation for each digit
- **Live Tracking** - Real-time updates every second
- **Password-Protected Reset** - Secure counter reset functionality
- **Persistent Storage** - Remembers start time across sessions
- **Responsive Design** - Looks great on mobile and desktop
- **Modern UI** - Dark gradient background with neon accents

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adilio/banked-timer.git
cd banked-timer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Configuration

### Change Start Date

Edit `src/App.jsx`:

```javascript
const getInitialTimestamp = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored || '2025-11-01T12:00:00Z'; // Change this date
};
```

### Change Reset Password

Edit `src/App.jsx`:

```javascript
const RESET_PASSWORD = 'banked123'; // Change this password
```

## Usage

### Resetting the Counter

1. Enter password (default: `banked123`)
2. Click "Reset Counter" button
3. Timer resets to 0 and starts counting from current time

### How It Works

The timer calculates elapsed time from a configurable start timestamp and displays:
- **Days** (3 digits)
- **Hours** (00-23)
- **Minutes** (00-59)
- **Seconds** (00-59)

Each digit has a mechanical flip animation when it changes.

## Project Structure

```
banked-timer/
├── src/
│   ├── App.jsx          # Main component with timer logic
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── README.md
```

## Deployment

### GitHub Pages (via Actions)

Already wired up at `.github/workflows/deploy.yml`:
- Triggers on pushes to `main` (and manual runs).
- Builds the Vite app and publishes `dist/` with `actions/deploy-pages`.

**First-time setup:**  
- Repo Settings → Pages → Build and deployment → Source: GitHub Actions.

**Customizing the base path:**  
- `vite.config.js` is set to `base: '/banked-timer/'` for `adilio.github.io/banked-timer`.  
- If you fork/rename, update `base` to match your repo name (e.g. `'/your-repo-name/'`).

**Deploying:**  
- Push to `main` → workflow runs → site updates at `https://adilio.github.io/banked-timer/` (or your username if forked).  
- You can also run the workflow manually from the Actions tab.

#### Manual Trigger:
   - Go to Actions tab → "Deploy to GitHub Pages" → Run workflow

### Build for Production

```bash
npm run build
```

The `dist/` folder contains your production-ready files.

## Customization

### Colors

The app uses CSS custom properties. Main colors:
- Primary: `#00ff88` (neon green)
- Background: `#1a1a2e` to `#16213e` (dark blue gradient)

### Digit Size

Adjust in `src/App.jsx` FlipDigit component:
```javascript
width: 'clamp(50px, 10vw, 90px)',
height: 'clamp(80px, 16vw, 140px)',
fontSize: 'clamp(4rem, 14vw, 7rem)',
```

## Troubleshooting

**Timer not starting?**
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors

**Animation not smooth?**
- Ensure hardware acceleration is enabled in browser
- Try different browser

**Build fails?**
- Delete `node_modules` and run `npm install` again
- Ensure Node.js version is 16+

## 📄 License

MIT License - feel free to use this project however you'd like!

## Contributing

PRs welcome! Feel free to:
- Report bugs
- Suggest features
- Improve documentation
- Submit pull requests

---

Built with care using React + Vite
