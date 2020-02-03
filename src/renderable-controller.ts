import { Renderer } from './renderer';
import { App } from './app';
import { Controller } from './controller';

export abstract class RenderableController extends Controller {
  public renderer: Renderer;
  public onRendered: () => void;
  constructor(public app: App, public parentSelector: string, id: string) {
    super(id);
  }

  abstract init(args?: any);

  destroy() {}
}
