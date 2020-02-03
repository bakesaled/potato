import { Http, App } from '../src/';
import { HomeController } from './modules/home.controller';
import { ContactController } from './modules/contact.controller';
import { ControllerIds } from '../src/controller-ids';

const app = new App(new Http());
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // document ready
    app.register(new HomeController(app, 'potato-content-child'));
    app.register(new ContactController(app, 'potato-content-child'));

    app.bootstrap(
      {
        appBarOptions: {
          items: [
            {
              text: 'Github',
              link: 'https://github.com/bakesaled'
            }
          ]
        },
        menuBarOptions: {
          items: [
            {
              text: 'home',
              contentTarget: 'home'
            },
            {
              text: 'contact',
              contentTarget: 'contact'
            }
          ]
        }
      },
      () => {
        app.bus.broadcast('state-changed', ControllerIds.CONTENT, 'home');
      }
    );
  }
};
