import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Chip,
  Fade,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Search, Link, QrCode } from '@mui/icons-material';

interface ProductInputProps {
  onAnalyze: (input: string) => void;
  isLoading: boolean;
  error?: string;
}

const ProductInput: React.FC<ProductInputProps> = ({ onAnalyze, isLoading, error }) => {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'asin' | 'url'>('url');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input.trim());
    }
  };

  const detectInputType = (value: string) => {
    if (value.length === 10 && /^[A-Z0-9]{10}$/.test(value)) {
      setInputType('asin');
    } else if (value.includes('amazon.com')) {
      setInputType('url');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    detectInputType(value);
  };

  const getPlaceholder = () => {
    switch (inputType) {
      case 'asin':
        return 'Enter ASIN (e.g., B08N5WRWNW)';
      case 'url':
        return 'Paste Amazon product URL';
      default:
        return 'Enter ASIN or paste Amazon URL';
    }
  };

  const getInputIcon = () => {
    switch (inputType) {
      case 'asin':
        return <QrCode />;
      case 'url':
        return <Link />;
      default:
        return <Search />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Paper
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.1)',
          borderRadius: 4,
          p: 4,
          mb: 3,
        }}
      >
        <Box textAlign="center" mb={3}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                mb: 1,
              }}
            >
              AutomatoTester
            </Typography>
          </motion.div>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 2, fontWeight: 400 }}
          >
            Optimize your Amazon listings with AI-powered insights
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ position: 'relative' }}>
            <TextField
              fullWidth
              value={input}
              onChange={handleInputChange}
              placeholder={getPlaceholder()}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  '&:hover': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputBase-input': {
                  padding: '16px 20px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'primary.main' }}>
                    {getInputIcon()}
                  </Box>
                ),
              }}
            />
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
            <Chip
              label="ASIN"
              color={inputType === 'asin' ? 'primary' : 'default'}
              variant={inputType === 'asin' ? 'filled' : 'outlined'}
              onClick={() => setInputType('asin')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="URL"
              color={inputType === 'url' ? 'primary' : 'default'}
              variant={inputType === 'url' ? 'filled' : 'outlined'}
              onClick={() => setInputType('url')}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!input.trim() || isLoading}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 3,
                  minWidth: 200,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                  },
                }}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Product'}
              </Button>
            </motion.div>
          </Box>
        </form>

        {error && (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            💡 Tip: You can paste an Amazon product URL or enter just the ASIN
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default ProductInput; 