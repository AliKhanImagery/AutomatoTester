import axios from 'axios';
import { AmazonProduct, OpenAIResponse, OptimizationSuggestion } from '../types';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || 'your-openai-api-key-here';
const OPENAI_BASE_URL = 'https://api.openai.com/v1/chat/completions';

export class OpenAIService {
  private static async makeOpenAIRequest(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        OPENAI_BASE_URL,
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert Amazon SEO consultant and copywriter. Your job is to optimize Amazon product listings for better search rankings, conversion rates, and BSR (Best Sellers Rank). Provide specific, actionable suggestions that follow Amazon\'s best practices.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('OpenAI API error:', error);
      throw new Error(error.response?.data?.error?.message || 'OpenAI API request failed');
    }
  }

  private static parseOptimizationResponse(response: string): OptimizationSuggestion[] {
    try {
      // Parse the structured response from OpenAI
      const suggestions: OptimizationSuggestion[] = [];
      
      // This is a simplified parser - in production you'd want more robust parsing
      const sections = response.split('---');
      
      sections.forEach(section => {
        const lines = section.trim().split('\n');
        const typeMatch = lines[0].match(/TYPE:\s*(brand-voice|bullets|description)/i);
        const type = typeMatch?.[1] as 'brand-voice' | 'bullets' | 'description';
        
        if (type) {
          const currentMatch = lines.find(line => line.startsWith('CURRENT:'))?.replace('CURRENT:', '').trim();
          const suggestedMatch = lines.find(line => line.startsWith('SUGGESTED:'))?.replace('SUGGESTED:', '').trim();
          const reasoningMatch = lines.find(line => line.startsWith('REASONING:'))?.replace('REASONING:', '').trim();
          
          if (currentMatch && suggestedMatch) {
            suggestions.push({
              type,
              current: currentMatch,
              suggested: suggestedMatch,
              reasoning: reasoningMatch || 'Optimized for better Amazon SEO and conversion',
              improvements: []
            });
          }
        }
      });
      
      return suggestions;
    } catch (error) {
      console.error('Error parsing optimization response:', error);
      return [];
    }
  }

  static async optimizeProductListing(product: AmazonProduct): Promise<OpenAIResponse> {
    try {
      const prompt = `
Analyze this Amazon product listing and provide optimization suggestions for better SEO, BSR ranking, and conversion rates.

PRODUCT INFORMATION:
Title: ${product.title}
Brand: ${product.brand}
Description: ${product.description}
Bullet Points: ${product.bullets.join('\n')}

Please provide optimization suggestions in the following format:

TYPE: brand-voice
CURRENT: [current brand voice description]
SUGGESTED: [optimized brand voice]
REASONING: [why this change will help]

TYPE: bullets
CURRENT: [current bullet points]
SUGGESTED: [optimized bullet points]
REASONING: [why these changes will help]

TYPE: description
CURRENT: [current description]
SUGGESTED: [optimized description]
REASONING: [why this change will help]

Also provide:
- SEO Score (1-100): [score]
- BSR Potential Improvement: [percentage]
- Top Keyword Opportunities: [list of keywords]
      `;

      const response = await this.makeOpenAIRequest(prompt);
      const suggestions = this.parseOptimizationResponse(response);
      
      // Extract additional metrics from response
      const seoScoreMatch = response.match(/SEO Score \(1-100\):\s*(\d+)/);
      const bsrMatch = response.match(/BSR Potential Improvement:\s*(\d+)%/);
      const keywordsMatch = response.match(/Top Keyword Opportunities:\s*(.+)/);
      
      return {
        suggestions,
        seoScore: parseInt(seoScoreMatch?.[1] || '50'),
        bsrPotential: parseInt(bsrMatch?.[1] || '20'),
        keywordOpportunities: keywordsMatch?.[1].split(',').map(k => k.trim()) || []
      };
    } catch (error) {
      console.error('Error optimizing product listing:', error);
      throw error;
    }
  }

  static async generateBrandVoiceSuggestion(currentVoice: string, productContext: string): Promise<string> {
    const prompt = `
Optimize this brand voice for better Amazon product performance:

Current Brand Voice: ${currentVoice}
Product Context: ${productContext}

Provide an optimized brand voice that:
1. Builds trust and credibility
2. Appeals to the target audience
3. Differentiates from competitors
4. Aligns with Amazon's best practices

Optimized Brand Voice:
    `;

    return await this.makeOpenAIRequest(prompt);
  }

  static async generateBulletOptimization(currentBullets: string[], productContext: string): Promise<string[]> {
    const prompt = `
Optimize these Amazon bullet points for better conversion and SEO:

Current Bullets:
${currentBullets.map((bullet, index) => `${index + 1}. ${bullet}`).join('\n')}

Product Context: ${productContext}

Provide optimized bullet points that:
1. Lead with benefits, not features
2. Include relevant keywords naturally
3. Address customer pain points
4. Use power words and emotional triggers
5. Follow Amazon's character limits

Optimized Bullets:
    `;

    const response = await this.makeOpenAIRequest(prompt);
    return response.split('\n').filter(line => line.trim().length > 0);
  }

  static async generateDescriptionOptimization(currentDescription: string, productContext: string): Promise<string> {
    const prompt = `
Optimize this Amazon product description for better SEO and conversion:

Current Description: ${currentDescription}
Product Context: ${productContext}

Provide an optimized description that:
1. Includes relevant keywords naturally
2. Tells a compelling story
3. Addresses customer concerns
4. Uses persuasive copywriting techniques
5. Follows Amazon's guidelines

Optimized Description:
    `;

    return await this.makeOpenAIRequest(prompt);
  }
} 