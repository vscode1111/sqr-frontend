import { Box } from '@mui/material';
import * as React from 'react';
import { CSSProperties } from 'react';

interface RowLayoutProps {
  children: React.ReactNode;
  style?: CSSProperties;
  flexs?: number[];
}

export function RowLayout({ children, style, flexs }: RowLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 2 }}>
      {React.Children.toArray(children).map((child, i) => {
        return (
          <Box key={i} flex={flexs ? flexs[i] : 1} style={style}>
            {child}
          </Box>
        );
      })}
    </Box>
  );
}
