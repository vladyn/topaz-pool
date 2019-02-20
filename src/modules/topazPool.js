import { KEY } from "../constants";
import HtmlElement from "../utils/HtmlElement";
import dateFUT from "../utils/dateService";

const topazPool = (() => {
  async function fetchItems(target, key, ...rest) {
    const endpoint = `${target}?method=${rest[0].method}&api_key=${KEY}&group_id=${rest[0].group_id}`;
    const endpointOptions = `format=${rest[0].format}&nojsoncallback=${rest[0].callback}`;
    const result = await fetch(`${endpoint}&${endpointOptions}`);
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
          id: prop.id,
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
