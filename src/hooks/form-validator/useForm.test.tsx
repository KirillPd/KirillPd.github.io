import * as React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react';

import { useForm } from './useForm';

const setupInput = (register: any, inputName: string) => {
  const utils = render(
    <input data-testid={inputName} {...register(inputName)} />
  );

  return {
    input: utils.getByTestId(inputName),
  };
};

const mockedEvent = {
  preventDefault: () => {},
} as React.SyntheticEvent;

const inputName1 = 'testInput1';
const inputName2 = 'testInput2';

const newInputValue1 = 'testUser1';
const newInputValue2 = 'testUser2';

describe('useForm', () => {
  describe('handleSubmit', () => {
    it('should pass correct data to `onSubmit` callback when inputs were changed', () => {
      const { result } = renderHook(() =>
        useForm({
          [inputName1]: {
            value: '',
          },
          [inputName2]: {
            value: '',
            rule: (value: string) => value === 'test'
          },
        })
      );

      const { input: input1 } = setupInput(result.current.register, inputName1);
      const { input: input2 } = setupInput(result.current.register, inputName2);

      const onSubmit = jest.fn();

      fireEvent.change(input1, { target: { value: newInputValue1 } });
      fireEvent.change(input2, { target: { value: newInputValue2 } });

      result.current.handleSubmit(onSubmit)(mockedEvent);

      expect(onSubmit).toBeCalledWith({
        [inputName1]: {
          value: newInputValue1,
          isValid: true,
        },
        [inputName2]: {
          value: newInputValue2,
          isValid: false,
        },
      });
    });
  });

  describe('isValid', () => {
    it('should be falsy when at least one field is invalid', () => {
      const { result } = renderHook(() =>
        useForm({
          [inputName1]: {
            value: '',
          },
          [inputName2]: {
            value: '',
            rule: (value: string) => value === 'test'
          },
        })
      );

      const { input: input1 } = setupInput(result.current.register, inputName1);
      const { input: input2 } = setupInput(result.current.register, inputName2);

      const onSubmit = jest.fn();

      fireEvent.change(input1, { target: { value: newInputValue1 } });
      fireEvent.change(input2, { target: { value: newInputValue2 } });

      expect(result.current.isValid).toBeFalsy();
    });

    it('should change to value to `true` when valid value is applied', () => {
      const { result } = renderHook(() =>
        useForm({
          [inputName1]: {
            value: '',
            rule: (value: string) => value === newInputValue1
          },
          [inputName2]: {
            value: '',
            rule: (value: string) => value === newInputValue2
          },
        })
      );

      expect(result.current.isValid).toBeFalsy();

      const { input: input1 } = setupInput(result.current.register, inputName1);
      const { input: input2 } = setupInput(result.current.register, inputName2);

      fireEvent.change(input1, { target: { value: newInputValue1 } });
      fireEvent.change(input2, { target: { value: newInputValue2 } });

      expect(result.current.isValid).toBeTruthy();
    });

    it('should be truthy when fields don`t have validation rules', () => {
      const { result } = renderHook(() =>
        useForm({
          [inputName1]: {
            value: '',
          },
          [inputName2]: {
            value: '',
          },
        })
      );

      expect(result.current.isValid).toBeTruthy();
    });
  });
});
