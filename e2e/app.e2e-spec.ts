import { AlbumCollectionPage } from './app.po';

describe('album-collection App', function() {
  let page: AlbumCollectionPage;

  beforeEach(() => {
    page = new AlbumCollectionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
