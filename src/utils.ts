import { logger } from './app';

export class Utils {
  public static load(selector: string, url: string, done: () => void) {
    const req = new XMLHttpRequest();
    const element = document.querySelector(selector);
    req.onload = () => {
      if (req.readyState === 4 && req.status === 200) {
        element.innerHTML = req.responseText;
        done();
      } else {
        logger.error(req.response);
        done();
      }
    };
    req.open('GET', url, true);
    req.send();
  }
}
