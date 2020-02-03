import { RenderableController } from '../../src/renderable-controller';
import { App } from '../../src';
import { HomeRenderer } from './home.renderer';

export class HomeController extends RenderableController {
  constructor(app: App, parentSelector: string) {
    super(app, parentSelector, 'home');
    this.renderer = new HomeRenderer(parentSelector);
  }

  public init() {
    this.renderer.onRendered = () => {};
  }
}
