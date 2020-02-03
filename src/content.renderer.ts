import { Renderer } from './renderer';
import { Utils } from './utils';
import { logger } from './app';

export class ContentRenderer extends Renderer {
  constructor(parentSelector: string) {
    super(parentSelector);
    this.fileName = 'src/content.html';
  }

  public render() {
    logger.debug('render content');
    Utils.load(this.parentSelector, this.fileName, () =>
      this.loadHtmlComplete()
    );
  }

  public loadHtmlComplete() {
    logger.debug('load html content', this);
    if (this.onRendered) {
      this.onRendered();
    }
  }

  public destroy() {
    logger.debug('destroy content');
    document.querySelector(this.parentSelector).innerHTML = '';
  }
}
