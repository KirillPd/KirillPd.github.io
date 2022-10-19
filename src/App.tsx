import * as React from 'react';
import { Box } from '@mui/material';

import { LoginForm } from './components/forms/Login';
import { HoverMover } from './components/hover-mover/HoverMover';
import { InfoButton } from './components/info-button/InfoButton';
import { SuccessDialog } from './components/success-dialog/SuccessDialog';

function App() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleSubmit = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
        position="relative"
      >
        <Box>
          <LoginForm onSubmit={handleSubmit} />
        </Box>
      </Box>
      <SuccessDialog open={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
}

export default App;
