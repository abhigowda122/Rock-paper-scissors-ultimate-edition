# 🎮 Rock Paper Scissors - Ultimate Edition

A feature-rich, interactive Rock-Paper-Scissors game built with vanilla JavaScript, HTML5, and CSS3. This game offers multiple game modes, AI difficulty levels, comprehensive statistics tracking, and a beautiful user interface with dark mode support.

**🔗 Live Demo**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Click_Here-brightgreen?style=for-the-badge)](https://abhigowda122.github.io/Rock-paper-scissors-ultimate-edition/)
## 🌟 Features

### Core Gameplay
- **User vs Computer** - Play against an intelligent AI opponent
- **Instant Results** - Get immediate feedback on each round
- **Visual Feedback** - Animated hand gestures and result displays
- **Smooth Animations** - Professional transitions and effects throughout

### 🎯 Game Modes

#### 1. Classic Mode
Traditional Rock-Paper-Scissors with three choices:
- 🪨 **Rock** beats Scissors
- 📄 **Paper** beats Rock
- ✂️ **Scissors** beats Paper

#### 2. Extended Mode (Rock-Paper-Scissors-Lizard-Spock)
Advanced mode with five choices:
- 🪨 **Rock** beats Scissors & Lizard
- 📄 **Paper** beats Rock & Spock
- ✂️ **Scissors** beats Paper & Lizard
- 🦎 **Lizard** beats Paper & Spock
- 🖖 **Spock** beats Rock & Scissors

#### 3. Tournament Mode
Competitive mode with customizable match lengths:
- **Best of 3** - First to 2 wins
- **Best of 5** - First to 3 wins
- **Best of 7** - First to 4 wins

### 🤖 AI Difficulty Levels

#### Easy
- Pure random selection
- No pattern recognition
- Perfect for beginners

#### Medium (Default)
- 70% random choices
- 30% counter to your most-used choice
- Slight pattern recognition
- Balanced gameplay

#### Hard
- Advanced pattern detection
- Learns from your recent 10 moves
- Counters your strategies
- Challenging for experienced players

### 📊 Statistics & Analytics

#### Real-time Stats Display
- **Win Rate** - Percentage of games won
- **Current Streak** - Active winning/losing streak
- **Best Streak** - Highest consecutive wins
- **Total Games** - Overall games played

#### Detailed Statistics Modal
- Overall performance (wins, losses, draws)
- Win rate percentage
- Streak records (current, best, worst)
- Most used choices (player & computer)
- Computer's choice distribution
- Visual pie chart showing game results

### 📜 Game History

#### History Tracking
- Complete log of all rounds played
- Shows: Round number, choices, results, timestamps
- Scrollable list with color-coded results
- Most recent games displayed first

#### Export Options
- **Export as JSON** - Machine-readable format for analysis
- **Export as CSV** - Spreadsheet-compatible format
- Clear history option with confirmation

### 🎨 Visual Features

#### Theme Support
- **Light Theme** - Clean, bright interface (default)
- **Dark Theme** - Eye-friendly dark mode
- Smooth theme transitions
- Persistent theme selection

#### Animations & Effects
- Animated hand gestures during gameplay
- Confetti animation on wins
- Shake animation on losses
- Pulsing VS indicator
- Smooth color transitions
- Bouncing result messages
- Hover effects on all interactive elements

#### Responsive Design
- Mobile-friendly layout
- Tablet optimized
- Desktop enhanced
- Fluid grid system
- Touch-friendly buttons

### ⌨️ Keyboard Shortcuts

Play efficiently with keyboard controls:
- **R** - Select Rock
- **P** - Select Paper
- **S** - Select Scissors
- **L** - Select Lizard (Extended mode)
- **K** - Select Spock (Extended mode)

### 🔊 Sound Effects

- Optional sound toggle
- Win sounds (ascending tones)
- Lose sounds (descending tones)
- Draw sound (neutral tone)
- Web Audio API implementation
- No external audio files needed

### 💾 Data Persistence

All game data is automatically saved to browser localStorage:
- Player name
- Game scores
- Statistics
- Game history
- Theme preference
- Sound settings
- Difficulty settings
- Game mode selection

### 🎁 Additional Features

- **Player Name Customization** - Personalize your gaming experience
- **Score Board** - Real-time score tracking with visual indicators
- **Quick Stats Panel** - Important metrics always visible
- **Rules Modal** - Interactive guide with keyboard shortcut reference
- **Share Stats** - Share your performance on social media or copy to clipboard
- **Reset Game** - Start fresh with confirmation dialog
- **Notification System** - Toast-style messages for actions

## 🚀 Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start playing immediately - no build process required!

### File Structure

```
rock-paper-scissors/
│
├── index.html          # Main HTML file with game structure
├── css/
│   └── style.css       # All styles, animations, and themes
├── js/
│   └── game.js         # Complete game logic and functionality
└── README.md           # This file
```

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Dependencies

All dependencies are loaded via CDN:
- **Font Awesome 6.4.0** - Icon library
- **Google Fonts (Poppins)** - Typography
- **Chart.js** - Statistics visualization

No npm or build tools required!

## 🎮 How to Play

### Quick Start
1. Enter your name (optional)
2. Select a game mode
3. Choose AI difficulty
4. Click on Rock, Paper, or Scissors (or use keyboard shortcuts)
5. Watch the animated result
6. Play again!

### Game Rules

#### Classic Mode
- Rock crushes Scissors
- Paper covers Rock
- Scissors cuts Paper

#### Extended Mode
- Rock crushes Scissors and Lizard
- Paper covers Rock and disproves Spock
- Scissors cuts Paper and decapitates Lizard
- Lizard eats Paper and poisons Spock
- Spock vaporizes Rock and smashes Scissors

### Winning Strategy
- **Against Easy AI**: Any strategy works
- **Against Medium AI**: Mix up your choices frequently
- **Against Hard AI**: Avoid patterns, stay unpredictable, change your strategy mid-game

## 📈 Current Features Status

### ✅ Completed Features
- [x] Classic Rock-Paper-Scissors gameplay
- [x] Extended mode with Lizard & Spock
- [x] Tournament mode (Best of 3/5/7)
- [x] Three AI difficulty levels
- [x] Real-time score tracking
- [x] Win streak counter
- [x] Comprehensive statistics dashboard
- [x] Interactive pie chart visualization
- [x] Complete game history log
- [x] Export history (JSON & CSV)
- [x] Dark/Light theme toggle
- [x] Sound effects with toggle
- [x] Confetti animation on wins
- [x] Shake animation on losses
- [x] Keyboard shortcuts (R, P, S, L, K)
- [x] Player name customization
- [x] Local storage persistence
- [x] Share statistics feature
- [x] Responsive mobile design
- [x] Rules modal with instructions
- [x] Reset game functionality
- [x] Smooth animations throughout

### 🎯 Recommended Next Steps

1. **Multiplayer Mode**
   - Local 2-player mode
   - Online multiplayer with WebSockets
   - Friend challenge system

2. **Enhanced AI**
   - Neural network-based AI
   - Multiple AI personalities
   - AI difficulty customization

3. **Achievements System**
   - Unlock badges for milestones
   - Achievement gallery
   - Progress tracking

4. **Power-ups & Special Modes**
   - Time attack mode
   - Survival mode
   - Special power-ups during gameplay

5. **Social Features**
   - Online leaderboard
   - Player profiles
   - Friend system
   - Global rankings

6. **Customization**
   - Custom themes/skins
   - Choice animations
   - Sound pack selection
   - Background music

7. **Advanced Analytics**
   - Detailed performance graphs
   - Move prediction analysis
   - Historical trend charts
   - Export comprehensive reports

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid & Flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks
- **Chart.js** - Data visualization
- **Web Audio API** - Sound effects
- **LocalStorage API** - Data persistence
- **Canvas API** - Confetti animation

### Performance Optimizations
- Minimal DOM manipulation
- CSS animations over JavaScript
- Efficient event delegation
- Debounced resize handlers
- Lazy chart rendering

### Code Organization
- Modular function structure
- Clear separation of concerns
- Comprehensive comments
- Consistent naming conventions
- Event-driven architecture

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --accent-color: #fd79a8;
    /* ... more variables */
}
```

### Adding New Game Modes
Extend the `gameRules` object in `js/game.js`:
```javascript
const gameRules = {
    classic: { /* ... */ },
    extended: { /* ... */ },
    yourNewMode: {
        choice1: ['beats_this', 'and_this'],
        // ... more rules
    }
};
```

### Modifying AI Behavior
Adjust difficulty settings in the `getComputerChoice()` function in `js/game.js`

## 📱 Mobile Experience

The game is fully optimized for mobile devices:
- Touch-friendly buttons (min 44x44px)
- Responsive grid layouts
- Optimized font sizes
- Vertical layout on small screens
- No hover-dependent features
- Fast tap response

## 🐛 Known Issues

None at the moment! If you find a bug, please report it.

## 📝 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created as part of a static website development project.

## 🎉 Acknowledgments

- Inspired by the classic Rock-Paper-Scissors game
- Extended rules by Sam Kass and Karen Bryla
- Popularized by "The Big Bang Theory"

## 📞 Support

For questions or issues:
1. Check the Rules modal in the game
2. Review this README
3. Inspect browser console for errors

---

## 🎮 Entry Points & URIs

### Main Entry Point
- **`index.html`** - Game homepage (default entry)

### Available Sections (Accessible via Modals)
- **Rules Modal** - Click "Rules" button or press on rules icon
- **Statistics Modal** - Click "Statistics" button to view detailed stats
- **History Modal** - Click "History" button to review past games

### Keyboard Shortcuts (Global)
- `R` - Rock
- `P` - Paper
- `S` - Scissors
- `L` - Lizard (Extended mode only)
- `K` - Spock (Extended mode only)

### Storage Keys (LocalStorage)
- `rpsGameState` - Contains all game data including:
  - Player name
  - Scores
  - Game mode & difficulty
  - History
  - Statistics
  - Preferences

---

**Ready to play? Open index.html and start your gaming journey!** 🎮🎉
