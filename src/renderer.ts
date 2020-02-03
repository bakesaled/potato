export abstract class Renderer {
  fileName: string;
  abstract render();
  abstract loadHtmlComplete();
  abstract destroy();
  onRendered: () => void;
  constructor(public parentSelector: string) {}
}
