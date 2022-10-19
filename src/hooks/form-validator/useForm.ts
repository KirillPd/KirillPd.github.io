import * as React from 'react';

export interface FormConfig {
  [key: string]: {
    value: string;
    rule?: (value: string) => boolean;
  };
}

export interface FormData {
  [key: string]: {
    value: string;
    isValid: boolean;
  };
}

export const useForm = (config: FormConfig) => {
  const [data, setData] = React.useState<FormData>(
    Object.keys(config).reduce<FormData>((fields, fieldName) => {
      const { value, rule } = config[fieldName];

      fields[fieldName] = {
        value,
        isValid: rule ? rule(value) : true,
      };

      return fields;
    }, {})
  );

  const hasErrors = Object.keys(data).some(
    (inputName) => !data[inputName].isValid
  );

  const register = (inputName: string) => {
    return {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const { rule } = config[inputName];

        setData((prevData) => ({
          ...prevData,
          [inputName]: {
            value,
            isValid: rule ? rule(value) : true,
          },
        }));
      },
    };
  };

  const handleSubmit = (callback: (data: FormData) => void) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault();
      callback(data);
    };
  };

  return {
    register,
    handleSubmit,
    isValid: !hasErrors,
  };
};
