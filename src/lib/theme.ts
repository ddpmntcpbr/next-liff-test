// lib/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      color: '#333333', // すべての Typography に黒を適用
    },
  },
});

export default theme;
