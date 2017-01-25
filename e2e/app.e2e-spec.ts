import { Ng2ReduxCounterPage } from './app.po';

describe('ng2-redux-counter App', function() {
  let page: Ng2ReduxCounterPage;

  beforeEach(() => {
    page = new Ng2ReduxCounterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
