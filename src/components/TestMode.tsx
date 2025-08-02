import React from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { PlayArrow } from '@mui/icons-material';
import { mockProductAnalysis } from '../utils/mockData';

interface TestModeProps {
  onShowResults: (analysis: any) => void;
}

const TestMode: React.FC<TestModeProps> = ({ onShowResults }) => {
  const handleTestAnalysis = () => {
    onShowResults(mockProductAnalysis);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom color="primary">
          🧪 Test Mode
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Try the app with sample data to see how it works!
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
          <Typography variant="body2">
            <strong>Note:</strong> This is a demo with mock data. To use real Amazon product analysis, 
            you'll need to add your ScrapingBee and OpenAI API keys to the .env file.
          </Typography>
        </Alert>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrow />}
            onClick={handleTestAnalysis}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
              },
            }}
          >
            Try Demo Analysis
          </Button>
        </motion.div>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          This will show you how the optimization suggestions and SEO analysis work
        </Typography>
      </Box>
    </motion.div>
  );
};

export default TestMode; 