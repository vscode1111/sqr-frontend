import { Resolver } from 'react-hook-form';
import { RequestEntity } from './types';

export type TFormValidationErrorRule<T> = {
  fields: keyof T | keyof T[];
  rule: (values: T) => string | undefined;
};

const SHARES_MAX = 100;

const getRules = (): TFormValidationErrorRule<RequestEntity>[] => [
  {
    fields: 'secret',
    rule: (values) => {
      if (!values.secret) {
        return 'Secret is required';
      }
    },
  },
  {
    fields: 'shares',
    rule: (values) => {
      if (!values.shares) {
        return 'Shares is required';
      }
      if (values.shares > SHARES_MAX) {
        return `Shares should be less ${SHARES_MAX}`;
      }
    },
  },
  {
    fields: 'threshold',
    rule: (values) => {
      if (!values.threshold) {
        return 'Threshold is required';
      }
      if (values.threshold > SHARES_MAX) {
        return `Threshold should be less ${SHARES_MAX}`;
      }
      if (Number(values.threshold) > Number(values.shares)) {
        return `Threshold ${values.threshold} should be less shares ${values.shares}`;
      }
    },
  },
];

export function getFormValidationErrors<T>(values: any, rules: TFormValidationErrorRule<T>[]) {
  return rules.reduce((acc, cur) => {
    const error = cur.rule(values);
    if (error) {
      const fields = cur.fields;
      if (Array.isArray(fields)) {
        fields.forEach((field) => {
          Object.assign(acc, { [field]: { message: error } });
        });
      } else {
        Object.assign(acc, { [fields]: { message: error } });
      }
    }
    return acc;
  }, {});
}

export const requestResolver = (): Resolver<RequestEntity> => (values) => {
  return {
    values: values as any,
    errors: getFormValidationErrors(values, getRules()),
  };
};
