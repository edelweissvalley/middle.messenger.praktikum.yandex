import { Component, TEvents } from 'src/utils/Component';
import { IValidationSchema, IValidationSchemaRules, TRule } from 'src/utils/validation';

export interface IEmpty {
  events?: TEvents;
  attrs?: { [key: string]: string };
}

export class Empty<P> extends Component<P & IEmpty> {
  render(): DocumentFragment {
    return this.compile(
      '',
      {
        events: this.props.events,
        attrs: this.props.attrs,
      }
    );
  }
}

export class EmptyInput extends Empty<{ validationSchema?: IValidationSchema; error?: string; }> {
  validationSchemaIsSet = false;

  setValidationEventHandlers(): void {
    const currentName: string = this.props.attrs?.name || '';
    const { rules, eventNames }: IValidationSchemaRules = Reflect.get(
      this.props.validationSchema || {}, currentName
    ) as IValidationSchemaRules;

    function handler(e: Event): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      const form = this.closest('form') as HTMLFormElement;
      const values = Object.fromEntries(new FormData(form).entries());

      void rules.find((f: TRule) => {
        const input = e.target as HTMLInputElement;
        const validation: string = f(values, currentName, e.type);

        input.setCustomValidity(validation);
        (input.parentElement as HTMLDivElement).dataset.error = validation;
      });
    }

    this.setProps({
      ...this.props,
      events: {
        ...this.props.events,
        ...eventNames.reduce((acc: { [key: string]: (e: Event) => void }, name) => {
          acc[name] = handler;

          return acc;
        }, {}),
      },
    });

  }

  componentDidUpdate() {
    if (!this.validationSchemaIsSet && this.props.validationSchema) {
      this.validationSchemaIsSet = true;
      this.setValidationEventHandlers();
    }
  }
}
