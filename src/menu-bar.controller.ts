import { RenderableController } from './renderable-controller';
import { App } from './app';
import { MenuBarRenderer } from './menu-bar.renderer';
import { MenuBarOptions } from './menu-bar.options';
import { ControllerIds } from './controller-ids';

export class MenuBarController extends RenderableController {
  constructor(app: App, parentSelector: string, options?: MenuBarOptions) {
    super(app, parentSelector, ControllerIds.MENU_BAR);
    this.renderer = new MenuBarRenderer(parentSelector, options);
  }

  public init() {
    this.renderer.onRendered = () => {
      this.app.bus.broadcast('rendered', ControllerIds.MENU_BAR);
    };
    (<MenuBarRenderer>this.renderer).onMenuSelect = target => {
      this.handleMenuSelect(target);
    };
    this.app.bus.listen('state-changed', ControllerIds.CONTENT, newId => {
      (<MenuBarRenderer>this.renderer).highlightItem(newId);
    });
  }

  private handleMenuSelect(target) {
    this.app.bus.broadcast('state-changed', ControllerIds.CONTENT, target);
  }
}
