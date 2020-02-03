export abstract class Controller {
  constructor(public id: string) {}
  abstract init(args?: any);
  abstract destroy();
}
