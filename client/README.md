# BattlePad

**Your Tablet Companion for Warhammer 40k**

BattlePad is a web-based digital battle companion for Warhammer 40k, optimized for tablet devices. Track victory points, manage command points, navigate game phases, and execute stratagems with ease.

## Features

- 📱 **Tablet-Optimized** - Designed for touch-first interaction on iPad, Android tablets, and other touch devices
- ⚔️ **All Game Sizes** - Supports Combat Patrol, Incursion, Strike Force, and Full Scale battles
- 🏆 **Victory Points Tracking** - Real-time VP tracking for both players
- ⚡ **Command Points Management** - Track CP spending and regeneration
- 📋 **Phase Navigation** - Step through Command, Movement, Shooting, Charge, and Fight phases
- 🎯 **Stratagem Reference** - Quick access to faction-specific stratagems
- 💾 **Local Storage** - Your game state is saved automatically in your browser
- 🌙 **Dark Theme** - Easy on the eyes during long gaming sessions

## Supported Factions

Currently supports the following Warhammer 40k factions:
- Space Marines (and all First Founding Chapters)
- Tyranids
- Orks

*More factions coming soon!*

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS with Catppuccin-inspired dark theme
- **State Management**: React Context with custom hooks
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/battlepad.git
cd battlepad/client

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Data Attribution

**Rules data in BattlePad is sourced from [Wahapedia](https://wahapedia.ru/).**

Wahapedia is a fan-created, open-source resource for Warhammer 40k rules. BattlePad uses Wahapedia's structured data to provide accurate rules, stratagems, and unit information.

We are grateful to the Wahapedia team for their dedication to making Warhammer 40k rules more accessible to the community.

*Warhammer 40,000, Combat Patrol, and all associated names, logos, and imagery are trademarks of Games Workshop Limited and are used with permission. BattlePad is a fan project and is not affiliated with Games Workshop.*

## Browser Support

- Chrome 90+ (recommended for tablets)
- Firefox 90+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Wahapedia](https://wahapedia.ru/) - For the comprehensive Warhammer 40k rules database
- [Games Workshop](https://www.games-workshop.com/) - For creating the Warhammer 40k universe
- [Catppuccin](https://github.com/catppuccin/catppuccin) - For the beautiful color palette
