import { logger, Renderer } from '../../src';
import { Utils } from '../../src/utils';

export class HomeRenderer extends Renderer {
  constructor(parentSelector: string) {
    super(parentSelector);
    this.fileName = 'demo/modules/home.html';
  }

  public render() {
    logger.debug('render home');
    Utils.load(this.parentSelector, this.fileName, () =>
      this.loadHtmlComplete()
    );
  }

  public loadHtmlComplete() {
    logger.debug('load html home', this);
    if (this.onRendered) {
      this.onRendered();
    }
  }

  public destroy() {
    logger.debug('destroy home');
    document.querySelector(this.parentSelector).innerHTML = '';
  }
}
