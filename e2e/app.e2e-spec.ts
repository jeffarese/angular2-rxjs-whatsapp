import { GingerAdminPage } from './app.po';

describe('ginger-admin App', function() {
  let page: GingerAdminPage;

  beforeEach(() => {
    page = new GingerAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
