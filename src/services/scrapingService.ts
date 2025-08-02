import axios from 'axios';
import { AmazonProduct, ScrapingResult } from '../types';

const SCRAPINGBEE_API_KEY = process.env.REACT_APP_SCRAPINGBEE_API_KEY || 'your-api-key-here';
const SCRAPINGBEE_BASE_URL = 'https://app.scrapingbee.com/api/v1/';

export class ScrapingService {
  private static extractASIN(url: string): string | null {
    // Extract ASIN from Amazon URL
    const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
    return asinMatch ? asinMatch[1] : null;
  }

  private static extractProductData(html: string): AmazonProduct | null {
    try {
      // This is a simplified parser - in production you'd want more robust parsing
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract title
      const titleElement = doc.querySelector('#productTitle');
      const title = titleElement?.textContent?.trim() || '';

      // Extract brand
      const brandElement = doc.querySelector('#bylineInfo') || doc.querySelector('.a-link-normal.contributorNameID');
      const brand = brandElement?.textContent?.trim() || '';

      // Extract price
      const priceElement = doc.querySelector('.a-price-whole');
      const price = priceElement?.textContent?.trim() || '';

      // Extract description
      const descriptionElement = doc.querySelector('#productDescription p') || doc.querySelector('#feature-bullets');
      const description = descriptionElement?.textContent?.trim() || '';

      // Extract bullets
      const bulletElements = doc.querySelectorAll('#feature-bullets li');
      const bullets = Array.from(bulletElements).map(el => el.textContent?.trim()).filter((text): text is string => Boolean(text));

      // Extract ASIN from URL
      const asin = this.extractASIN(window.location.href) || '';

      return {
        asin,
        title,
        brand,
        price,
        description,
        bullets,
      };
    } catch (error) {
      console.error('Error parsing product data:', error);
      return null;
    }
  }

  static async scrapeAmazonProduct(urlOrASIN: string): Promise<ScrapingResult> {
    try {
      let url = urlOrASIN;
      
      // If it's an ASIN, construct the Amazon URL
      if (urlOrASIN.length === 10 && /^[A-Z0-9]{10}$/.test(urlOrASIN)) {
        url = `https://www.amazon.com/dp/${urlOrASIN}`;
      }

      // Validate it's an Amazon URL
      if (!url.includes('amazon.com')) {
        return {
          success: false,
          error: 'Please provide a valid Amazon product URL or ASIN'
        };
      }

      const response = await axios.get(SCRAPINGBEE_BASE_URL, {
        params: {
          api_key: SCRAPINGBEE_API_KEY,
          url: url,
          render_js: 'false',
          country_code: 'us',
          premium_proxy: 'true',
        },
        timeout: 30000,
      });

      if (response.status === 200) {
        const productData = this.extractProductData(response.data);
        
        if (productData) {
          return {
            success: true,
            data: productData,
          };
        } else {
          return {
            success: false,
            error: 'Failed to extract product data from the page'
          };
        }
      } else {
        return {
          success: false,
          error: `Scraping failed with status: ${response.status}`
        };
      }
    } catch (error: any) {
      console.error('Scraping error:', error);
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Scraping failed'
      };
    }
  }
} 