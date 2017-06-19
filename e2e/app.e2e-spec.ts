import { UnitTestAppPage } from './app.po';

describe('unit-test-app App', () => {
  let page: UnitTestAppPage;

  beforeEach(() => {
    page = new UnitTestAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
