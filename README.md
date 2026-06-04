# WANTED: A KIDNEY - Campaign Website

A modern, accessible website for Todd Lyman's kidney transplant campaign. This site helps find living kidney donors and raise funds for medical expenses.

## 🎯 Features

✅ **Fully Responsive Design** - Mobile-first approach that works on all devices  
✅ **Accessibility First** - WCAG 2.1 AA compliant with semantic HTML  
✅ **Modern Dark Theme** - Easy on the eyes with beautiful cyan and green accents  
✅ **Social Sharing** - Built-in share functionality with toast notifications  
✅ **Dynamic Progress Bar** - Real-time fundraising progress updates  
✅ **SEO Optimized** - Meta tags and structured data for search engines  
✅ **Performance Optimized** - Fast loading with lazy image loading  
✅ **Print Friendly** - Looks great when printed  
✅ **FAQ Section** - Comprehensive answers to common questions  
✅ **Timeline View** - Clear visual representation of the journey  
✅ **Analytics Ready** - Google Analytics integration support  
✅ **Toast Notifications** - Modern, non-intrusive user feedback  

## 📁 Project Structure

```
kidney-campaign/
├── index.html              # Main HTML file with complete content
├── css/
│   └── styles.css          # All styling (variables, responsive design)
├── js/
│   └── script.js           # Interactive features and utilities
├── images/
│   ├── profile.jpg         # Todd's profile picture
│   └── banner.jpg          # Campaign banner image
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Pages auto-deployment
├── README.md               # This file
└── .gitignore              # Git ignore file
```

## ✨ Key Features Explained

### Accessibility
- Semantic HTML (`<main>`, `<footer>`, `<nav>`)
- Skip link for keyboard navigation
- ARIA labels and roles for screen readers
- Proper heading hierarchy
- Focus visible states on all interactive elements
- High color contrast ratios (WCAG AA compliant)
- Support for reduced motion preferences
- Keyboard navigation for all interactive elements

### Performance
- CSS variables for easy customization
- Image lazy loading for faster page loads
- Image dimensions specified to prevent layout shift
- No external dependencies (pure HTML/CSS/JS)
- Optimized for Core Web Vitals

### User Experience
- Toast notifications instead of alerts
- Smooth scrolling animations
- Responsive grid layouts
- Modern card-based design
- Clear visual hierarchy
- Details/accordion elements for expandable content

### Content Sections
1. **Header** - Profile photo and campaign introduction
2. **Call-to-Action Cards** - Two main actions (donate or donate)
3. **Story Section** - Full context and background
4. **FAQ** - Comprehensive Q&A addressing common concerns
5. **Timeline** - Visual representation of Todd's journey
6. **Medical Support** - Information about HCA Florida Largo
7. **Contact Section** - Direct email contact
8. **Footer** - Legal disclaimers and copyright

### Analytics & Tracking
- Google Analytics integration ready
- Event tracking for:
  - Button clicks
  - External link clicks
  - Page load times
  - Time on page
  - Share actions
- Console logging for debugging

## 🚀 Getting Started

### Setup Local Development

1. Clone the repository:
```bash
git clone git@github.com:toddkidneyjourney1/Kidney-campaign.git
cd Kidney-campaign
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
http-server
```

Then visit `http://localhost:8000` in your browser.

### Customization

#### Update Personal Information
- Edit email address in `index.html` (search for `todd.kidney.journey@gmail.com`)
- Update fundraising goal in `js/script.js` (line 6)
- Update medical facility information
- Replace placeholder images in `images/` folder

#### Modify Colors
Edit CSS variables in `css/styles.css` (lines 7-26):
```css
:root {
    --color-accent-blue: #38bdf8;
    --color-accent-green: #10b981;
    --color-bg-primary: #0b131f;
    /* ... more variables ... */
}
```

#### Add Google Analytics
1. Create a Google Analytics 4 property at https://analytics.google.com
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace the placeholder ID in `index.html` line 17

#### Update Content
- Story sections in `index.html` lines 64-79
- FAQ items in `index.html` lines 82-116
- Timeline items in `index.html` lines 132-159

## 🌐 Deployment

### GitHub Pages (Recommended)

1. Ensure you have admin access to the repository
2. Go to repository Settings → Pages
3. Select `main` branch as source
4. Your site will be live at: `https://toddkidneyjourney1.github.io/Kidney-campaign/`

The repository includes an optional GitHub Actions workflow for automatic deployment.

### Custom Domain

1. Add a `CNAME` file with your domain:
```
yourdomain.com
```

2. Configure DNS settings with your registrar to point to:
```
toddkidneyjourney1.github.io
```

3. Update GitHub Pages settings to use your custom domain

### Other Hosting Platforms

The project is fully static HTML/CSS/JS, so it can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Any traditional web hosting

## 🧪 Testing

### Accessibility Testing
- [WAVE Browser Extension](https://wave.webaim.org/extension/) - Visual feedback
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome DevTools
- [NVDA Screen Reader](https://www.nvaccess.org/) - Free Windows screen reader
- [axe DevTools](https://www.deque.com/axe/devtools/) - Chrome extension
- [Keyboard Navigation](https://www.w3.org/WAI/test-evaluate/preliminary/) - Tab through all elements

### Performance Testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### Browser Compatibility
- Chrome/Edge (latest 2 versions) ✓
- Firefox (latest 2 versions) ✓
- Safari (latest 2 versions) ✓
- Mobile browsers (iOS Safari, Chrome Mobile) ✓

## 📊 Integration Options

### GoFundMe Integration
Currently, the progress bar shows a static goal. To integrate live GoFundMe data:

1. Use GoFundMe's unofficial API or RSS feed
2. Or create a serverless function (AWS Lambda, Vercel, etc.) to fetch and cache the data
3. Update the `/api/fundraising-data` endpoint in `js/script.js`

### Email Services
The contact form uses mailto links. To add a real email service:
- Formspree
- EmailJS
- SendGrid
- AWS SES

### Social Media
Update the social links in `index.html` header section with real profiles once they're created.

## 🔐 Privacy & Security

- No cookies or tracking (unless Google Analytics is enabled)
- No form data collection (unless you add a backend service)
- HTTPS recommended for deployment
- No sensitive data stored client-side

## 📝 Content Guidelines

### For Donors
- Clear, honest communication about medical needs
- Explain the donation process thoroughly
- Highlight safety and recovery information
- Provide direct contact information

### For Fundraising
- Regular updates on campaign progress
- Transparent use of funds
- Medical facility partnership information
- Thank donors publicly (with permission)

## 🤝 Contributing

To suggest improvements:
1. Create an issue describing your suggestion
2. Fork the repository
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 💬 Support

For questions or support:
- Open an issue on GitHub
- Contact Todd directly at: todd.kidney.journey@gmail.com
- Create a discussion in the repository

## 🙏 Special Thanks

- Built with accessibility and modern web standards in mind
- Designed to maximize reach for organ donation awareness
- Open source to help others create similar campaigns

---

**Remember**: Spreading the word about living kidney donation can save lives. Please share this campaign with your network! 🫀

**Last Updated:** June 4, 2026
