// language=hbs
import { EmptyInput } from 'src/components/Empty';
import { Component, TProps } from 'src/utils/Component';
import { IValidationSchema, setValidationSchema } from 'src/utils/validation';

import './styles.pcss';

export const smallFormInputClassName = 'small-form__input';

interface IProps extends TProps {
  name?: string;
  placeholder?: string;
  inputElement: EmptyInput;
  validationSchema?: IValidationSchema;
  attrs?: { [key: string]: string; };
}

export class Input extends Component<IProps> {
  validationSchemaIsSet = false;

  constructor(tagName: keyof HTMLElementTagNameMap | undefined, props: IProps) {
    super(tagName, props);
  }

  componentDidUpdate(): void {
    if (!this.validationSchemaIsSet) {
      this.validationSchemaIsSet = true;
      setValidationSchema(this.children, this.props.validationSchema);
    }
  }

  render(): DocumentFragment {
    return this.compile(
      `
        <div class="small-form__input-parent">
          {{{inputElement}}}
          <span class="small-form__input-title">{{placeholder}}</span>
        </div>
      `,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        placeholder: this.children.inputElement.props.attrs?.placeholder,
        inputElement: this.props.inputElement,
      }
    );
  }
}
