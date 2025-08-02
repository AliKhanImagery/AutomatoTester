import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExpandMore,
  TrendingUp,
  Search,
  Lightbulb,
  ContentCopy,
  CheckCircle,
  Info,
} from '@mui/icons-material';
import { ProductAnalysis } from '../types';

interface AnalysisResultsProps {
  analysis: ProductAnalysis;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'brand-voice':
        return <TrendingUp />;
      case 'bullets':
        return <Lightbulb />;
      case 'description':
        return <Search />;
      default:
        return <Info />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'brand-voice':
        return 'primary';
      case 'bullets':
        return 'secondary';
      case 'description':
        return 'success';
      default:
        return 'info';
    }
  };

  const getSuggestionTitle = (type: string) => {
    switch (type) {
      case 'brand-voice':
        return 'Brand Voice Optimization';
      case 'bullets':
        return 'Bullet Points Enhancement';
      case 'description':
        return 'Description SEO Improvement';
      default:
        return 'Content Optimization';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* SEO Score and Metrics */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {analysis.seoScore}/100
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SEO Score
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={analysis.seoScore}
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h4" color="secondary" fontWeight="bold">
                  +{analysis.bsrPotential}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  BSR Potential
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {analysis.keywordOpportunities.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keyword Opportunities
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Product Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            {analysis.product.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Brand: {analysis.product.brand}
          </Typography>
          {analysis.product.price && (
            <Typography variant="h6" color="primary" fontWeight="bold">
              {analysis.product.price}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Optimization Suggestions
      </Typography>

      <AnimatePresence>
        {analysis.suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Chip
                    icon={getSuggestionIcon(suggestion.type)}
                    label={getSuggestionTitle(suggestion.type)}
                    color={getSuggestionColor(suggestion.type)}
                    variant="filled"
                    sx={{ mr: 2 }}
                  />
                </Box>

                <Grid container spacing={3}>
                  {/* Current Content */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom color="text.secondary">
                      Current
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        position: 'relative',
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {suggestion.current}
                      </Typography>
                      <Tooltip title="Copy current content">
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(suggestion.current)}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          {copiedText === suggestion.current ? <CheckCircle color="success" /> : <ContentCopy />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>

                  {/* Suggested Content */}
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Suggested
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'primary.50',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'primary.200',
                        position: 'relative',
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {suggestion.suggested}
                      </Typography>
                      <Tooltip title="Copy suggested content">
                        <IconButton
                          size="small"
                          onClick={() => copyToClipboard(suggestion.suggested)}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          {copiedText === suggestion.suggested ? <CheckCircle color="success" /> : <ContentCopy />}
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>

                {/* Reasoning */}
                <Box mt={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Why this optimization helps
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {suggestion.reasoning}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Keyword Opportunities */}
      {analysis.keywordOpportunities.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Keyword Opportunities
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {analysis.keywordOpportunities.map((keyword, index) => (
                <motion.div
                  key={keyword}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Chip
                    label={keyword}
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                </motion.div>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default AnalysisResults; 