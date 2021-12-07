// language=hbs
import './styles.pcss';

export default `
  <div class="small-form__input-parent">
    {{#if name}}
      <input type="text" name="{{name}}" class="small-form__input" placeholder="{{placeholder}}" />
    {{^}}
      <input type="text" class="small-form__input" placeholder="{{placeholder}}" />
    {{/if}}
    <span class="small-form__input-title">{{placeholder}}</span>
  </div>
`;
