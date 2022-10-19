import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';

import {
  FormConfig,
  FormData,
  useForm,
} from '../../hooks/form-validator/useForm';
import { HoverMover } from '../hover-mover/HoverMover';
import { InfoButton } from '../info-button/InfoButton';

interface Props {
  onSubmit: (data: FormData) => void;
}

export enum InputName {
  USERNAME = 'username',
  PASSWORD = 'password',
}

const FORM_WIDTH = '320px';
const FORM_CONFIG: FormConfig = {
  [InputName.USERNAME]: {
    value: '',
    rule: (value) => value === 'admin',
  },
  [InputName.PASSWORD]: {
    value: '',
    rule: (value) => value.length > 0,
  },
};

export const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, isValid } = useForm(FORM_CONFIG);
  const inputsContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box p={3} width={FORM_WIDTH}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div ref={inputsContainerRef}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              {...register(InputName.USERNAME)}
            />
          </Box>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              {...register(InputName.PASSWORD)}
            />
          </Box>
        </div>
        <HoverMover sx={{ zIndex: 10 }}>
          <InfoButton />
        </HoverMover>
        <HoverMover disabled={isValid} width={FORM_WIDTH}>
          {/*
            User is still able to click the button via keyboard navigation
            To Fix that set disabled={!isValid} property
            I don't want to change styles of the button to make it more confusing :)
          */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              pointerEvents: isValid ? 'auto' : 'none',
            }}
          >
            Login
          </Button>
        </HoverMover>
      </form>
    </Box>
  );
};
