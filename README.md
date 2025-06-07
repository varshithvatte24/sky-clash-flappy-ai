

![Sky Clash Gameplay Preview](preview.png) <!-- You can add a screenshot or GIF here -->

---

## 🚀 Features

* 🧠 **AI vs Human Gameplay**
  Watch an autonomous AI bird navigate pipes while you try to beat its score.

* 🎮 **Simple Controls**

  * Press `Space` or click the screen to flap.
  * Restart the game by pressing `Space` or clicking after a game over.

* 📈 **High Score Tracking**
  Your best human score is stored locally in your browser.

* 🌍 **Responsive Design**
  Automatically adjusts to fit any screen size.

---

## 🖼️ Game Assets

* **Background:** `1.gif`
* **Human Bird Image:** `human.png`
* **AI Bird Image:** `ai.png`

Make sure these images are in the same directory or update the source paths in the code accordingly.

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/sky-clash.git
cd sky-clash
```

### 2. Open in Browser

Simply open the `index.html` file in any modern browser.

---

## 📁 Project Structure

```bash
sky-clash/
│
├── index.html           # Main HTML file
├── game.js              # Game logic (the code you provided)
├── 1.gif                # Background image
├── human.png            # Human bird sprite
├── ai.png               # AI bird sprite
├── style.css            # (Optional) CSS styling
└── README.md            # Project README
```

---

## 🤖 How the AI Works

The AI bird uses a simple reactive logic:

* It checks the position of the next upcoming pipe.
* If it’s near the bottom pipe opening, it flaps to avoid collision.
* It doesn’t learn—just reacts fast.

---

## 📌 TODO / Ideas for Future

* [ ] Smarter AI using neural networks (NEAT algorithm)
* [ ] Sound effects and background music
* [ ] Leaderboards synced via a backend
* [ ] Mobile touch support enhancements



## ❤️ Acknowledgements

Inspired by the classic Flappy Bird and the idea of humans competing with AI in real time.
