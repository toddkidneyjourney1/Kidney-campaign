# WANTED: A KIDNEY - Campaign Website

A modern, accessible website for Todd Lyman's kidney transplant campaign. This site helps find living kidney donors and raise funds for medical expenses.

## Features

✅ **Fully Responsive Design** - Mobile-first approach that works on all devices
✅ **Accessibility First** - WCAG 2.1 AA compliant with semantic HTML
✅ **Modern Dark Theme** - Easy on the eyes with beautiful cyan accents
✅ **Social Sharing** - Built-in share functionality for easy spreading
✅ **Dynamic Progress Bar** - Updates to show fundraising progress
✅ **SEO Optimized** - Meta tags and structured data for search engines
✅ **Performance Optimized** - Fast loading with minimal dependencies
✅ **Print Friendly** - Looks great when printed

## Project Structure

```
kidney-campaign/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling (variables, responsive design)
├── js/
│   └── script.js       # Interactive features and utilities
├── images/
│   ├── profile.jpg     # Todd's profile picture
│   └── banner.jpg      # Campaign banner image
├── README.md           # This file
└── .gitignore          # Git ignore file
```

## Key Improvements from Original

### Accessibility
- Added semantic HTML (`<main>`, `<footer>`, `<nav>`)
- Skip link for keyboard navigation
- ARIA labels and roles for screen readers
- Proper heading hierarchy
- Focus visible states on all interactive elements
- Improved color contrast ratios
- Support for reduced motion preferences

### Performance
- CSS variables for easy customization
- Minified CSS for production
- Lazy loading ready for images
- Image dimensions specified to prevent layout shift
- No external dependencies

### Code Quality
- External CSS and JavaScript files
- Well-commented code
- Mobile-first responsive design
- CSS Grid and Flexbox for layouts
- Consistent naming conventions

### SEO & Social
- Open Graph meta tags
- Proper page description
- Keywords and structured data ready
- Favicon included
- Share button with Web Share API fallback

### Functionality
- Dynamic progress bar with real-time updates
- Share button with native sharing
- Clipboard fallback for unsupported browsers
- Email validation ready
- Screen reader announcements
- Smooth scrolling

## Getting Started

### Setup Local Development

1. Clone the repository:
```bash
git clone git@github.com:toddkidneyjourney1/Kidney-campaign.git
cd Kidney-campaign
```

2. Open `index.html` in your browser or use a local server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Customization

#### Update Personal Information
- Edit email address in `index.html` (line with `mailto:`)
- Update social media links
- Replace placeholder images in `images/` folder

#### Modify Colors
Edit CSS variables in `css/styles.css` (lines 6-22):
```css
:root {
    --color-accent-blue: #38bdf8;
    --color-accent-green: #10b981;
    /* ... more variables ... */
}
```

#### Update Fundraising Goals
Edit the goal amount in `js/script.js`:
```javascript
function updateProgress(raised, goal = 50000) {
    // Change 50000 to your desired goal
}
```

## Deployment

### GitHub Pages

1. Ensure `index.html` is in the root directory
2. Go to repository Settings → Pages
3. Select `main` branch as source
4. Your site will be live at: `https://toddkidneyjourney1.github.io/Kidney-campaign/`

### Custom Domain

1. Add `CNAME` file with your domain
2. Configure DNS settings with your registrar
3. Update GitHub Pages settings

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Testing

Test the site with:
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## Contributing

To suggest improvements:
1. Create an issue describing your suggestion
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or support:
- Open an issue on GitHub
- Contact Todd directly via the website contact form

---

**Remember**: Spreading the word about living kidney donation can save lives. Please share this campaign with your network!