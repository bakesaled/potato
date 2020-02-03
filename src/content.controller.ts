import { App, logger } from './app';
import { RenderableController } from './renderable-controller';
import { ContentRenderer } from './content.renderer';
import { ControllerIds } from './controller-ids';

export class ContentController extends RenderableController {
  public currentModuleId: string;
  constructor(public app: App, parentSelector: string) {
    super(app, parentSelector, ControllerIds.CONTENT);
    this.renderer = new ContentRenderer(parentSelector);
  }

  public init() {
    this.renderer.onRendered = () => {
      logger.debug('onRendered content');
      this.app.bus.removeMessages('state-changed');
      this.app.bus.listen('state-changed', this.id, newId => {
        logger.debug('start module', newId);
        this.startModule(newId[0]);
      });
      this.app.bus.broadcast('rendered', ControllerIds.CONTENT);
    };
  }

  public destroy() {}

  protected stopCurrentModule() {}

  private startModule(newId) {
    this.app.destroy(this.currentModuleId);
    this.currentModuleId = newId;
    this.app.init(this.currentModuleId);
  }
}
