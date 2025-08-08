# 🎨 Modern Portfolio Website

A stunning, responsive portfolio website built with **Vite**, **HTML5**, **CSS3**, and **vanilla JavaScript**. Features beautiful animations, smooth hover effects, and a modern design aesthetic.

## ✨ Features

### 🎭 Design & Animations
- **Classy gradient backgrounds** with subtle textures
- **Smooth hover animations** on all interactive elements
- **Floating card animations** with 3D effects
- **Parallax scrolling** effects
- **Micro-interactions** for enhanced user experience
- **Glowing elements** and animated gradients

### 📱 Responsive Design
- **Mobile-first approach** for optimal mobile experience
- **Responsive grid layouts** that adapt to all screen sizes
- **Touch-friendly navigation** for mobile devices
- **Adaptive typography** scaling

### 🚀 Performance
- **Optimized animations** with `requestAnimationFrame`
- **Lazy loading** for smooth performance
- **Minimal bundle size** with Vite optimization
- **CSS custom properties** for theming

### ♿ Accessibility
- **Keyboard navigation** support
- **Screen reader friendly** semantic HTML
- **High contrast mode** support
- **Reduced motion** respect for users with vestibular disorders

## 🛠️ Technologies Used

- **Vite** - Fast build tool and dev server
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, Grid, and Flexbox
- **JavaScript ES6+** - Modern vanilla JavaScript
- **Google Fonts** - Inter & Space Grotesk typography

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see your portfolio

### Building for Production

```bash
npm run build
```

The optimized files will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── portfolio-icon.svg    # Custom favicon
│   └── vite.svg             # Vite logo
├── src/
│   ├── main.js              # Main JavaScript file
│   └── style.css            # All styles and animations
├── index.html               # Main HTML file
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎨 Customization Guide

### 1. Personal Information
Edit the HTML content in `index.html`:
- Replace "Your Name" with your actual name
- Update contact information
- Modify project descriptions
- Add your own project links

### 2. Colors & Theming
Customize the color scheme in `src/style.css`:
```css
:root {
  --primary-color: #6366f1;     /* Main brand color */
  --secondary-color: #f59e0b;   /* Accent color */
  --accent-color: #10b981;      /* Success/highlight color */
  /* ... more color variables */
}
```

### 3. Typography
Change fonts by updating the Google Fonts import in `index.html` and CSS variables:
```css
:root {
  --font-primary: 'Your-Font', sans-serif;
  --font-display: 'Your-Display-Font', sans-serif;
}
```

### 4. Animations
Adjust animation timing and effects in the CSS:
```css
:root {
  --transition-fast: 0.15s ease-out;
  --transition-base: 0.3s ease-out;
  --transition-slow: 0.5s ease-out;
}
```

## 🌟 Key Animation Features

### Hover Effects
- **Navigation links**: Smooth underline animation with lift effect
- **Buttons**: 3D lift with shimmer effect on hover
- **Cards**: Scale and shadow transformation
- **Project overlays**: Smooth fade-in with links

### Scroll Animations
- **Hero title**: Staggered slide-up animation
- **Floating card**: Continuous floating motion
- **Parallax elements**: Depth-based movement
- **Section reveals**: Intersection observer triggers

### Interactive Elements
- **Cursor trail**: Desktop-only following dots
- **Card tilt**: 3D perspective on mouse movement
- **Form feedback**: Visual submission states
- **Mobile menu**: Smooth slide animation

## 📊 Performance Optimizations

- **CSS custom properties** for efficient theme switching
- **Intersection Observer** for scroll-triggered animations
- **RequestAnimationFrame** for smooth animations
- **Debounced scroll events** to prevent performance issues
- **Minimal JavaScript** bundle with tree-shaking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vite** for the amazing build tool
- **Google Fonts** for beautiful typography
- **CSS Gradient** inspiration from various design resources
- **Modern CSS** techniques from the web development community

## 🔗 Demo

[Live Demo](https://your-portfolio-url.com) | [GitHub Repository](https://github.com/yourusername/portfolio)

---

**Built with ❤️ and modern web technologies**

*Feel free to customize this portfolio template to make it uniquely yours!*
