import { RenderableController } from '../../src/renderable-controller';
import { App } from '../../src';
import { ContactRenderer } from './contact.renderer';

export class ContactController extends RenderableController {
  constructor(app: App, parentSelector: string) {
    super(app, parentSelector, 'contact');
    this.renderer = new ContactRenderer(parentSelector);
  }

  public init() {
    this.renderer.onRendered = () => {};
  }
}
