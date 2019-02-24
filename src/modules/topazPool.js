import HtmlElement from "../utils/HtmlElement";
import dateFUT from "../utils/dateService";

const topazPool = (() => {
  async function fetchItems(target, options) {
    const url = target;
    const endpoint = Object.entries(options).map(s => `&${s.join('=')}`);
    const partial = url + endpoint.join('').substring(1);
    const result = await fetch(partial);
    const json = await result.json();
    return json;
  }

  function handleResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.stat === 'ok') {
        resolve(response);
      } else if (response.stat !== 'ok') {
        reject(new Error(`Response is not OK: ${response.stat}`));
      } else {
        reject(new Error('Response status is unknown'));
      }
      return response;
    });
  }

  function renderResponse(response) {
    const photoStreamContainer = HtmlElement.create('div')
      .addId('photo-stream')
      .addChild({
        element: 'ul',
        id: 'stream-wrapper',
        class: 'stream-wrapper',
        classes: [
          'block',
          'grid',
        ],
      });

    photoStreamContainer.appendTo(document.querySelector('main'));

    return new Promise((resolve) => {
      const ul = photoStreamContainer.getChild('#stream-wrapper');
      response.photos.photo.forEach((prop) => {
        ul.addExtendedChild({
          element: 'li',
          id: `list-${prop.id}`,
          class: 'entry',
          classes: ['entry-item', 'flex-item'],
          picture: {
            src: `https://farm${prop.farm}.staticflickr.com/${prop.server}/${prop.id}_${prop.secret}.jpg`,
            media: [
              '(max-width: 639px)',
              '(min-width: 640px) and (max-width: 1023px)',
              '(min-width: 1024px)',
            ],
            srcset: [
              `https://farm${prop.farm}.staticflickr.com/${prop.server}/${prop.id}_${prop.secret}_q.jpg`,
              `https://farm${prop.farm}.staticflickr.com/${prop.server}/${prop.id}_${prop.secret}_z.jpg`,
              `https://farm${prop.farm}.staticflickr.com/${prop.server}/${prop.id}_${prop.secret}_b.jpg`,
            ],
            href: `https://farm${prop.farm}.staticflickr.com/${prop.server}/${prop.id}_${prop.secret}.jpg`,
            title: prop.title,
            id: prop.id,
            secret: prop.secret,
          },
          dateadded: dateFUT(prop.dateadded),
          meta: {
            title: {
              title: (prop.title !== '') ? prop.title : 'No title',
              href: `https://farm${prop.farm}.staticflickr.com/${prop.server}/${prop.id}_${prop.secret}.jpg`,
              elementWrapper: 'span',
              className: 'photo-title',
            },
            author: {
              title: prop.ownername,
              href: `https://flickr.com/${prop.owner}`,
              elementWrapper: 'span',
              className: 'photo-author',
            },
          },
        });
      });
      resolve(response);
    });
  }

  return {
    fetchItems,
    handleResponse,
    renderResponse,
  };
})();

export default topazPool;
