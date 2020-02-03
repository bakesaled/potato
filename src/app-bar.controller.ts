import { RenderableController } from './renderable-controller';

import { AppBarRenderer } from './app-bar.renderer';
import { ControllerIds } from './controller-ids';
import { AppBarOptions } from './app-bar.options';
import { App } from './app';

export class AppBarController extends RenderableController {
  constructor(app: App, parentSelector: string, options?: AppBarOptions) {
    super(app, parentSelector, ControllerIds.APP_BAR);
    this.renderer = new AppBarRenderer(parentSelector, options);
  }

  public init() {
    this.renderer.onRendered = () => {
      this.app.bus.broadcast('rendered', ControllerIds.APP_BAR);
    };
  }
}
