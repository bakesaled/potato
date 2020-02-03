import { logger, Renderer } from '../../src';
import { Utils } from '../../src/utils';

export class ContactRenderer extends Renderer {
  constructor(parentSelector: string) {
    super(parentSelector);
    this.fileName = 'demo/modules/contact.html';
  }

  public render() {
    logger.debug('render contact');
    Utils.load(this.parentSelector, this.fileName, () =>
      this.loadHtmlComplete()
    );
  }

  public loadHtmlComplete() {
    logger.debug('load html contact', this);
    if (this.onRendered) {
      this.onRendered();
    }
  }

  public destroy() {
    logger.debug('destroy contact');
    document.querySelector(this.parentSelector).innerHTML = '';
  }
}
