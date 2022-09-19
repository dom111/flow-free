import BaseElement from '@dom111/element';
export { s } from '@dom111/element';

export class Element extends BaseElement {
  attr(key: string, value: any = ''): void {
    this.element().setAttribute(key, value);
  }

  removeAttr(key: string): void {
    if (!this.element().hasAttribute(key)) {
      return;
    }

    this.element().removeAttribute(key);
  }
}

export default Element;
