# Birthday Pop - Adunni's Special Birthday Page

A beautiful, interactive birthday webpage with music, confetti effects, and heartfelt messages for Adunni.

## Features

- ✨ **Starry Animated Background** - Beautiful twinkling stars effect
- 🎵 **Background Music** - Automatic music playback on page load
- 🎉 **Confetti Effects** - Continuous confetti animation
- 💖 **Heartfelt Messages** - All the special messages from the image
- 📱 **Responsive Design** - Works on all devices
- 🖼️ **Image Support** - Placeholder images with fallback to styled placeholders

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your images:**
   - Place `adunni-image1.jpg` in `src/assets/` (My Dearest Adunni)
   - Place `adunni-image2.jpg` in `src/assets/` (My Beautiful Adunni)
   - Place `adunni-image3.jpg` in `src/assets/` (My Beloved Adunni)
   - Place `birthday-music.mp3` in `src/assets/` (optional background music)

3. **Run the application:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200`

## Customization

### Changing the Name
Edit `src/app/birthday/birthday.component.html` and change "Adunni" to your loved one's name.

### Adding Your Own Images
1. Replace the placeholder images in `src/assets/`
2. Update the image paths in the HTML if needed
3. The page will automatically fall back to styled placeholders if images aren't found

### Customizing Messages
Edit the `messages` array in `src/app/birthday/birthday.component.ts` to add your own special messages.

### Changing Colors
Modify the CSS variables in `src/app/birthday/birthday.component.css` to change the color scheme.

## Features in Detail

### Music
- Automatically plays on page load
- Falls back to generated "Happy Birthday" melody if no audio file is provided
- Loops continuously

### Confetti
- Uses canvas-confetti library
- Triggers every 2 seconds
- Beautiful pink and white confetti particles

### Animations
- Fade-in effects for message blocks
- Glowing title animation
- Twinkling star background
- Hover effects on images

## Technologies Used

- Angular 17
- TypeScript
- Canvas Confetti
- Web Audio API
- CSS3 Animations

## Browser Support

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS3 Animations
- Web Audio API
- Canvas API

---

Made with 💖 for Adunni's special day!
