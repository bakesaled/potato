import { Utils } from './utils';
import { Renderer } from './renderer';
import { MenuBarOptions } from './menu-bar.options';
import { logger } from './app';

export class MenuBarRenderer extends Renderer {
  public onMenuSelect: (target: any) => void;
  constructor(parentSelector: string, private options: MenuBarOptions) {
    super(parentSelector);
    this.fileName = 'src/menu-bar.html';
  }

  public render() {
    logger.debug('render menu');
    Utils.load(this.parentSelector, this.fileName, () =>
      this.loadHtmlComplete()
    );
  }

  public loadHtmlComplete() {
    logger.debug('load html menu', this);
    this.populateMenuItems();
    if (this.onRendered) {
      this.onRendered();
    }
  }

  public destroy() {
    logger.debug('destroy menu');
    document.querySelector(this.parentSelector).innerHTML = '';
  }

  public highlightItem(contentTarget: string) {
    const links = document.querySelectorAll('potato-menu-bar a');
    links.forEach((link: HTMLAnchorElement) => {
      link.style.background = 'none';
    });
    const item: HTMLAnchorElement = document.querySelector(
      `a[data-content-target="${contentTarget}"]`
    );
    if (item) {
      item.style.background = '#111';
    }
  }

  private populateMenuItems() {
    if (this.options) {
      const menuUlEl = document.querySelector(`${this.parentSelector} ul`);
      menuUlEl.innerHTML = '';
      for (let i = 0; i < this.options.items.length; i++) {
        const item = this.options.items[i];
        const liEl = document.createElement('li');
        const anchorEl: HTMLAnchorElement = document.createElement('a');
        anchorEl.setAttribute('data-content-target', item.contentTarget);
        anchorEl.href = '#';
        anchorEl.innerHTML = item.text;
        anchorEl.addEventListener('click', e => {
          const targetEl: HTMLAnchorElement = e.target as HTMLAnchorElement;
          this.onMenuSelect(
            targetEl.attributes.getNamedItem('data-content-target').value
          );
        });
        liEl.appendChild(anchorEl);
        menuUlEl.appendChild(liEl);
      }
    }
  }
}
