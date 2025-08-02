export interface AmazonProduct {
  asin: string;
  title: string;
  brand: string;
  price?: string;
  description: string;
  bullets: string[];
  images?: string[];
  rating?: number;
  reviewCount?: number;
  category?: string;
  bsr?: number; // Best Sellers Rank
}

export interface OptimizationSuggestion {
  type: 'brand-voice' | 'bullets' | 'description';
  current: string;
  suggested: string;
  reasoning: string;
  improvements: string[];
}

export interface ProductAnalysis {
  product: AmazonProduct;
  suggestions: OptimizationSuggestion[];
  seoScore: number;
  bsrPotential: number;
  keywordOpportunities: string[];
}

export interface ScrapingResult {
  success: boolean;
  data?: AmazonProduct;
  error?: string;
}

export interface OpenAIResponse {
  suggestions: OptimizationSuggestion[];
  seoScore: number;
  bsrPotential: number;
  keywordOpportunities: string[];
}

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  category: 'brand-voice' | 'bullets' | 'description' | 'general';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalAnalyses: number;
  averageSeoScore: number;
  topKeywords: string[];
  recentAnalyses: ProductAnalysis[];
} 