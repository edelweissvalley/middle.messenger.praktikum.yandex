import { Component, TEvents, TProps } from 'src/utils/Component';
import { Paths, Router } from 'src/utils/Router';

export interface ILinkProps extends TProps {
  href: Paths;
  text?: string;
  attrs?: { title?: string; class?: string; };
}

interface ICompile {
  attrs?: ILinkProps['attrs'];
  events?: TEvents;
  text?: string;
}

export class Link extends Component<ILinkProps> {
  constructor(props: ILinkProps) {
    super(
      'span',
      {
        ...props,
        events: {
          click() {
            Router.instance.go(props.href);
          },
        },
      }
    );
  }

  render(): DocumentFragment {
    return this.compile<ICompile>(
      '{{text}}',
      {
        events: this.props.events,
        attrs: this.props.attrs,
        text: this.props.text,
      }
    );
  }
}
