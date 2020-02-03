import { Renderer } from './renderer';
import { Utils } from './utils';
import { AppBarOptions } from './app-bar.options';
import { logger } from './app';

export class AppBarRenderer extends Renderer {
  constructor(parentSelector: string, private options: AppBarOptions) {
    super(parentSelector);
    this.fileName = 'src/app-bar.html';
  }

  public render() {
    logger.debug('render appbar');
    Utils.load(this.parentSelector, this.fileName, () =>
      this.loadHtmlComplete()
    );
  }

  public loadHtmlComplete() {
    logger.debug('load html appbar', this);
    this.populateAppBarItems();
    if (this.onRendered) {
      this.onRendered();
    }
  }

  public destroy() {
    logger.debug('destroy appbar');
    document.querySelector(this.parentSelector).innerHTML = '';
  }

  private populateAppBarItems() {
    if (this.options) {
      const appBarUlEl = document.querySelector(`${this.parentSelector} ul`);
      appBarUlEl.innerHTML = '';
      for (let i = 0; i < this.options.items.length; i++) {
        const item = this.options.items[i];
        const liEl = document.createElement('li');
        const anchorEl: HTMLAnchorElement = document.createElement('a');
        anchorEl.setAttribute('href', item.link);
        anchorEl.target = '_blank';
        anchorEl.innerHTML = item.text;

        liEl.appendChild(anchorEl);
        appBarUlEl.appendChild(liEl);
      }
    }
  }
}
