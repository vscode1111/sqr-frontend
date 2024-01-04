import { TextFieldInternal, TextFieldProps } from './TextFieldInternal';
import React, { ChangeEvent, forwardRef, useCallback } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

// import { useTextValidation } from '../hooks/useTextValidation';

interface TextFieldComponentProps<T extends FieldValues> extends TextFieldProps {
  name: Path<T>;
  control: Control<T, any>;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function TextFieldComponent<T extends FieldValues>(
  { name, control, onChange, ...rest }: TextFieldComponentProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
): JSX.Element {
  // const validateAmount = useTextValidation();
  const { field } = useController({
    name,
    control,
    // rules: { validate: validateAmount },
  });

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }

      field.onChange(event);
    },
    [field, onChange],
  );

  return <TextFieldInternal {...rest} ref={ref} value={field.value} onChange={handleChange} />;
}

export const TextField = forwardRef(TextFieldComponent);
