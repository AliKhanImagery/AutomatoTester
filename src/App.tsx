import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Dashboard,
  Analytics,
  Settings,
  Close,
} from '@mui/icons-material';
import { theme } from './theme/theme';
import ProductInput from './components/ProductInput';
import AnalysisResults from './components/AnalysisResults';
import TestMode from './components/TestMode';
import { ScrapingService } from './services/scrapingService';
import { OpenAIService } from './services/openaiService';
import { ProductAnalysis } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAnalyze = async (input: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      // Step 1: Scrape the product data
      const scrapingResult = await ScrapingService.scrapeAmazonProduct(input);
      
      if (!scrapingResult.success || !scrapingResult.data) {
        throw new Error(scrapingResult.error || 'Failed to scrape product data');
      }

      const product = scrapingResult.data;

      // Step 2: Generate optimization suggestions
      const openAIResult = await OpenAIService.optimizeProductListing(product);

      // Step 3: Combine results
      const analysisResult: ProductAnalysis = {
        product,
        suggestions: openAIResult.suggestions,
        seoScore: openAIResult.seoScore,
        bsrPotential: openAIResult.bsrPotential,
        keywordOpportunities: openAIResult.keywordOpportunities,
      };

      setAnalysis(analysisResult);
    } catch (err: any) {
      setError(err.message || 'An error occurred during analysis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysis(null);
    setError(null);
  };

  const drawerItems = [
    { text: 'Dashboard', icon: <Dashboard />, action: () => console.log('Dashboard') },
    { text: 'Analytics', icon: <Analytics />, action: () => console.log('Analytics') },
    { text: 'Settings', icon: <Settings />, action: () => console.log('Settings') },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AutomatoTester
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {drawerItems.map((item) => (
              <ListItem
                key={item.text}
                onClick={() => {
                  item.action();
                  setDrawerOpen(false);
                }}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductInput
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
                error={error || undefined}
              />
              
              <TestMode onShowResults={setAnalysis} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnalysisResults analysis={analysis} />
              
              {/* New Analysis Button */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Fab
                    variant="extended"
                    color="primary"
                    onClick={handleNewAnalysis}
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      },
                    }}
                  >
                    Analyze Another Product
                  </Fab>
                </motion.div>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </ThemeProvider>
  );
}

export default App;
