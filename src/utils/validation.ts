import { Component } from 'src/utils/Component';

export type TRule = (values: { [key: string]: unknown }, name: string, eventName: string) => string;

export interface IValidationSchemaRules {
  rules: TRule[],
  eventNames: string[],
}

export interface IValidationSchema {
  [key: string]: IValidationSchemaRules;
}

export function setValidationSchema<P>(
  children: P, validationSchema: IValidationSchema | null | undefined
): void {
  Object.entries(children).forEach(([, value]) => {
    if (value instanceof Component) {
      value.setProps(Object.assign(
        {},
        value.props,
        { validationSchema },
      ));
    }
  });
}
