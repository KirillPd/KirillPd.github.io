import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { Box } from '@mui/material';

import { calculateRandomOffset } from './calculateRandomOffset';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  width?: string;
  sx?: SxProps<Theme>;
}

const baseContainerStyles: SxProps<Theme> = {
  position: 'absolute',
  transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out',
};

export const HoverMover: React.FC<Props> = ({
  disabled,
  width,
  sx: customStyles,
  children,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [wrapperStyles, setWrapperStyles] = React.useState<SxProps<Theme>>({
    ...baseContainerStyles,
    ...customStyles,
    width: width || 'auto',
  });

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setWrapperStyles({
      ...wrapperStyles,
      top: `${containerRef.current.offsetTop}px`,
      left: `${containerRef.current.offsetLeft}px`,
    });
  }, [containerRef.current]);

  const handleMouseEnter = React.useCallback(() => {
    if (disabled) {
      return;
    }

    const maxTop =
      window.innerHeight - (containerRef.current?.clientHeight || 0);
    const topOffset = calculateRandomOffset(0, maxTop);

    const maxLeft =
      window.innerWidth - (containerRef.current?.clientWidth || 0);
    const leftOffset = calculateRandomOffset(0, maxLeft);

    setWrapperStyles({
      ...wrapperStyles,
      top: `${topOffset}px`,
      left: `${leftOffset}px`,
    });
  }, [disabled]);

  return (
    <Box ref={containerRef} onMouseEnter={handleMouseEnter} sx={wrapperStyles}>
      {children}
    </Box>
  );
};
