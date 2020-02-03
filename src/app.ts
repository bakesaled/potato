import { Http } from './http';
import { EventBus } from './event-bus';
import { Controller } from './controller';
import { RenderableController } from './renderable-controller';
import { AppBarController } from './app-bar.controller';
import { ContentController } from './content.controller';
import { MenuBarController } from './menu-bar.controller';
import { BootstrapOptions } from './bootstrap.options';
import { ControllerIds } from './controller-ids';
import { LogLevel, LogSlinger } from '@bakesaled/log-slinger';

export const logger = new LogSlinger(LogLevel.All);

export class App {
  private controllers: Map<string, Controller>;

  public bus: EventBus;

  constructor(private http: Http) {
    this.controllers = new Map<string, Controller>();
    this.bus = new EventBus();
  }

  public register(controller: Controller) {
    this.controllers.set(controller.id, controller);
    return this.controllers.get(controller.id);
  }

  public unregisterAll() {
    this.controllers.clear();
  }

  public init(controllerId: string, args?: any) {
    const controller: Controller = this.controllers.get(controllerId);
    logger.debug('init controller', controller, controllerId);
    controller.init(args);
    if (controller instanceof RenderableController) {
      controller.renderer.render();
    }
  }

  public destroy(controllerId: string) {
    if (controllerId === null) {
      return;
    }
    const controller = this.controllers.get(controllerId);
    if (controller == null) {
      return;
    }
    if (controller instanceof RenderableController) {
      controller.renderer.destroy();
    }
    controller.destroy();
  }

  public bootstrap(bootstrapOptions?: BootstrapOptions, done?: () => void) {
    this.bootstrapAppBar(bootstrapOptions);
    let menuBarController: MenuBarController;
    if (bootstrapOptions && bootstrapOptions.menuBarOptions) {
      menuBarController = <MenuBarController>(
        this.register(
          new MenuBarController(
            this,
            ControllerIds.MENU_BAR,
            bootstrapOptions.menuBarOptions
          )
        )
      );
    }
    this.register(new ContentController(this, ControllerIds.CONTENT));

    if (menuBarController) {
      this.bus.listen('rendered', ControllerIds.MENU_BAR, () => {
        this.renderContent(done);
      });
      this.init(ControllerIds.MENU_BAR);
    } else {
      logger.debug('no menu');
      this.renderContent(done);
    }
  }

  private renderContent(done) {
    this.bus.listen('rendered', ControllerIds.CONTENT, () => {
      done();
    });
    this.init(ControllerIds.CONTENT);
  }

  private bootstrapAppBar(bootstrapOptions: BootstrapOptions) {
    if (bootstrapOptions && bootstrapOptions.appBarOptions) {
      <AppBarController>(
        this.register(
          new AppBarController(
            this,
            ControllerIds.APP_BAR,
            bootstrapOptions.appBarOptions
          )
        )
      );
      this.init(ControllerIds.APP_BAR);
    }
  }
}
