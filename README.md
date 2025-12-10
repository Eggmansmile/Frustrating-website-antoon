# 🌪️ Frustrating Website

A deliberately frustrating web experience designed to test your patience. Features include chaotic loading bars, evasive CAPTCHA challenges, annoying prompts, and an abundance of frustration mechanics.

## 🎯 Features

- **Chaotic Loading Bar** - The progress bar behaves randomly:
  - 5% chance to reset to 0
  - 10% chance to jump backward
  - 20% chance to jump forward
  - 10% chance to get stuck
  - 55% chance to progress normally

- **Random Annoyances** - 30% chance to deny your clicks with error messages

- **CAPTCHA Challenge** - 40% chance to face a misleading math verification (hint: the hint lies)

- **Cookie Banner** - Persistent cookie notice with an evasive "Decline" button

- **Video Reward** - Complete the loading bar to unlock a video with animated cats

- **Background Music** - Elevator music plays automatically

- **Easter Eggs** - Hidden buttons with surprises

## 🚀 Quick Start

### Prerequisites
- Node.js 18+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Eggmansmile/Frustrating-website-antoon.git
cd Frustrating-website-antoon
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## 📦 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 6** - Build tool and dev server
- **Tailwind CSS** - Styling
- **GitHub Pages** - Hosting

## 🎨 Customization

### Colors
Custom color palette in `index.html` Tailwind config:
- `pain-yellow` - Annoying yellow
- `hurt-pink` - Bright pink
- `eye-green` - Neon green

### Typography
Using Comic Neue and Lobster fonts from Google Fonts for maximum annoyance.

## 📁 Project Structure

```
.
├── components/          # React components
│   ├── CookieBanner.tsx
│   ├── ProsseedButton.tsx
│   ├── CaptchaModal.tsx
│   ├── VideoModal.tsx
│   ├── UnhelpfulChat.tsx
│   ├── NuclearCodesButton.tsx
│   └── BackgroundMusic.tsx
├── services/           # Service layer
├── App.tsx            # Main app component
├── index.tsx          # Entry point
├── index.html         # HTML template
├── public/            # Static assets
│   └── music/         # Background music file
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript config
└── package.json       # Dependencies
```

## 🚀 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when you push to the main branch.

Live site: https://eggmansmile.github.io/Frustrating-website-antoon/

## 🤪 How It Works

1. Click the "Proceed" button to start loading
2. Face random obstacles:
   - Loading bar chaos
   - Random denial messages
   - CAPTCHA challenges
3. Reach 100% to see your reward
4. Enjoy the video with dancing cats and background music

## ⚠️ Browser Support

Works best in modern browsers (Chrome, Firefox, Edge, Safari). Autoplay may be blocked depending on browser settings.

## 📝 License

MIT License - feel free to use this to frustrate others!

## 👤 Author

Created by [Eggmansmile](https://github.com/Eggmansmile)

---

**Warning:** This website is intentionally designed to be frustrating. Use at your own risk. 🎉
