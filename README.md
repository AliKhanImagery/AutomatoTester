# AutomatoTester 🚀

A modern, AI-powered Amazon product optimization tool that helps sellers improve their listings for better SEO, BSR ranking, and conversion rates.

## Features ✨

- **Smart Input Detection**: Automatically detects ASIN or Amazon URLs
- **Real-time Scraping**: Extracts product data using ScrapingBee API
- **AI-Powered Optimization**: Uses OpenAI GPT-4 for content suggestions
- **Side-by-Side Comparison**: Compare current vs optimized content
- **SEO Scoring**: Get detailed SEO analysis and improvement metrics
- **Modern UI**: Clean, funky design with smooth animations
- **Copy-to-Clipboard**: Easy content copying for implementation

## Tech Stack 🛠️

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI v5 with custom theme
- **Animations**: Framer Motion
- **Scraping**: ScrapingBee API
- **AI**: OpenAI GPT-4
- **Styling**: Custom CSS with gradients and modern design

## Quick Start 🚀

### 1. Clone and Install

```bash
git clone <repository-url>
cd automato-tester
npm install
```

### 2. Environment Setup (Optional for Demo)

Create a `.env` file in the root directory for real API functionality:

```env
# ScrapingBee API Key (Free tier: 1000 requests/month)
REACT_APP_SCRAPINGBEE_API_KEY=your-scrapingbee-api-key-here

# OpenAI API Key
REACT_APP_OPENAI_API_KEY=your-openai-api-key-here
```

**Note:** The app includes a demo mode that works without API keys!

### 3. Get API Keys

#### ScrapingBee (Free Tier)
1. Sign up at [scrapingbee.com](https://scrapingbee.com)
2. Get your API key from the dashboard
3. Free tier includes 1000 requests/month

#### OpenAI
1. Sign up at [openai.com](https://openai.com)
2. Get your API key from the platform
3. Add credits to your account

### 4. Run the App

```bash
npm start
```

The app will open at `http://localhost:3000`

## Usage 📖

### Demo Mode (No API Keys Required)
1. **Try Demo**: Click "Try Demo Analysis" to see the app in action
2. **Review Results**: See how optimization suggestions work
3. **Explore Features**: Test the copy-to-clipboard and expandable sections

### Full Mode (With API Keys)
1. **Enter Product**: Paste an Amazon product URL or enter the ASIN
2. **Analyze**: Click "Analyze Product" to start the optimization process
3. **Review Results**: Compare current vs suggested content
4. **Copy & Implement**: Use the copy buttons to implement suggestions

## Project Structure 📁

```
src/
├── components/          # React components
│   ├── ProductInput.tsx
│   └── AnalysisResults.tsx
├── services/           # API services
│   ├── scrapingService.ts
│   └── openaiService.ts
├── types/             # TypeScript interfaces
│   └── index.ts
├── theme/             # MUI theme configuration
│   └── theme.ts
├── pages/             # Page components (future)
├── utils/             # Utility functions (future)
└── App.tsx           # Main app component
```

## Features in Detail 🔍

### Product Input
- Smart detection of ASIN vs URL
- Real-time input validation
- Loading states and error handling
- Modern, animated UI

### Analysis Results
- SEO score with visual progress bar
- BSR potential improvement
- Keyword opportunities
- Side-by-side content comparison
- Expandable reasoning sections
- Copy-to-clipboard functionality

### AI Optimization
- Brand voice optimization
- Bullet point enhancement
- Description SEO improvement
- Detailed reasoning for each suggestion

## Future Enhancements 🚧

- [ ] Dashboard for prompt management
- [ ] Analytics and performance tracking
- [ ] Screenshot upload functionality
- [ ] Supabase integration for data storage
- [ ] A/B testing capabilities
- [ ] Competitor analysis
- [ ] Bulk analysis features

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License 📄

MIT License - feel free to use this project for your own purposes!

## Support 💬

If you have any questions or need help setting up the project, feel free to open an issue or reach out!

---

**Built with ❤️ and lots of ☕**
