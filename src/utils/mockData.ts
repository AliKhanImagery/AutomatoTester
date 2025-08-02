import { ProductAnalysis } from '../types';

export const mockProductAnalysis: ProductAnalysis = {
  product: {
    asin: 'B08N5WRWNW',
    title: 'Echo Dot (4th Gen) | Smart speaker with Alexa | Charcoal',
    brand: 'Amazon',
    price: '$49.99',
    description: 'Meet the Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.',
    bullets: [
      'Meet the Echo Dot - Our most popular smart speaker with Alexa',
      'Voice control your music - Stream songs from Amazon Music, Apple Music, Spotify, Sirius XM, and others',
      'Ready to help - Ask Alexa to play music, answer questions, read the news, check the weather, set alarms, control compatible smart home devices, and more',
      'Voice control your smart home - Turn on lights, adjust thermostats, lock doors, and more with compatible connected devices',
      'Start Routines with your voice - Try saying "Alexa, good morning" to turn on the coffee maker and read the news'
    ],
    rating: 4.7,
    reviewCount: 125000,
    category: 'Electronics',
    bsr: 15
  },
  suggestions: [
    {
      type: 'brand-voice',
      current: 'Meet the Echo Dot - Our most popular smart speaker with Alexa.',
      suggested: 'Experience the Echo Dot - Amazon\'s #1 smart speaker featuring advanced Alexa voice technology.',
      reasoning: 'This creates a more premium, authoritative brand voice that emphasizes market leadership and technological advancement.',
      improvements: ['Emphasizes market leadership', 'Uses more sophisticated language', 'Highlights technological features']
    },
    {
      type: 'bullets',
      current: 'Voice control your music - Stream songs from Amazon Music, Apple Music, Spotify, Sirius XM, and others',
      suggested: '🎵 Unlimited Music Control - Stream from Amazon Music, Apple Music, Spotify, Sirius XM, and more with simple voice commands',
      reasoning: 'Added emoji for visual appeal, stronger action words, and clearer benefit statement.',
      improvements: ['Visual appeal with emoji', 'Stronger action words', 'Clearer benefit statement']
    },
    {
      type: 'description',
      current: 'Meet the Echo Dot - Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.',
      suggested: 'Transform your home with the Echo Dot - Amazon\'s best-selling smart speaker featuring Alexa voice assistant. Experience crystal-clear audio with premium sound quality in a sleek, space-saving design that fits perfectly anywhere.',
      reasoning: 'Enhanced with emotional triggers, stronger value propositions, and more descriptive language.',
      improvements: ['Added emotional triggers', 'Stronger value propositions', 'More descriptive language']
    }
  ],
  seoScore: 78,
  bsrPotential: 25,
  keywordOpportunities: [
    'smart speaker',
    'voice assistant',
    'home automation',
    'alexa speaker',
    'bluetooth speaker'
  ]
}; 