import HtmlElement from '../utils/HtmlElement';
import dateFUT from '../utils/dateService';
import {
  DETAILS, API_URL,
} from '../constants';

/**
 * Function requesting a single photo, constructing an lightbox element
 * and adding an event to each of the thumbnails
 * @return Function addEvent
 */
const getPhoto = (() => {
  const cover = HtmlElement.create('div')
    .addId('cover')
    .addClasses(['light-cover', 'flex', 'hidden']);
  document.getElementsByTagName('body')[0].appendChild(cover.element);
  /**
   * Function requesting a single photo
   * @param id - a photo id
   * @param secret - a single photo attribute
   * @return JSON response
   */
  const getImage = async (id, secret) => {
    const partialData = { method: 'flickr.photos.getInfo', photo_id: id, secret };
    const options = { ...DETAILS, ...partialData };
    const endpoint = Object.entries(options).map(s => `&${s.join('=')}`);
    const target = API_URL + endpoint.join('').substring(1);
    const result = await fetch(target);
    const json = await result.json();
    return json;
  };
  /**
   * Function constructing an lightbox element
   * @param res - a json object with the response from the group pool
   * @returns {void}
   */
  const buildLightBox = (res) => {
    const wrapper = HtmlElement.create('div')
      .addClasses(['lightbox-wrapper', 'flex-item'])
      .addChild({
        element: 'h1',
        class: 'light-title',
        textContent: res.photo.title['_content'],
      })
      .addPicture({
        src: `https://farm${res.photo.farm}.staticflickr.com/${res.photo.server}/${res.photo.id}_${res.photo.secret}.jpg`,
        media: [
          '(min-width: 480px) and (max-width: 640px)',
          '(min-width: 641px) and (max-width: 1920px)',
        ],
        srcset: [
          `https://farm${res.photo.farm}.staticflickr.com/${res.photo.server}/${res.photo.id}_${res.photo.secret}_n.jpg`,
          `https://farm${res.photo.farm}.staticflickr.com/${res.photo.server}/${res.photo.id}_${res.photo.secret}_z.jpg`,
          `https://farm${res.photo.farm}.staticflickr.com/${res.photo.server}/${res.photo.id}_${res.photo.secret}_b.jpg`,
        ],
        href: `https://farm${res.photo.farm}.staticflickr.com/${res.photo.server}/${res.photo.id}_${res.secret}.jpg`,
        title: res.photo.title['_content'],
        id: `lightbox-${res.photo.id}`,
        secret: `lightbox-${res.photo.secret}`,
      })
      .addChild({
        element: 'div',
        class: 'light-description',
        html: res.photo.description['_content'],
      })
      .addChild({
        element: 'div',
        class: 'light-dates',
        textContent: `Date posted: ${dateFUT(res.photo.dates.posted)} Date taken: ${res.photo.dates.taken}`,
      })
      .addChild({
        element: 'div',
        class: 'light-views',
        textContent: res.photo.views,
      })
      .addChild({
        element: 'div',
        class: 'comments',
        textContent: `Comments: ${res.photo.comments['_content']}`,
      })
      .addChild({
        element: 'div',
        class: 'light-origin',
        textContent: res.photo.hasOwnProperty('location') ? `Country: ${res.photo.location.country['_content']}, Region: ${res.photo.location.region['_content']}` : null,
      })
      .addChild({
        element: 'div',
        class: 'light-tags',
        textContent: `tags (${res.photo.tags.tag.length}): ${res.photo.tags.tag.map(name => name['_content']).join(' ')}`,
      })
      .addLink({
        id: 'closeBtn',
        title: 'Close',
        href: `javascript: ;`,
        elementWrapper: 'span',
        className: 'close',
      });

    cover.element.classList.remove('hidden');
    cover.element.classList.add('visible');
    cover.element.style.top = `${window.scrollY}px`;
    wrapper.appendTo(cover.element);
    function hide() {
      wrapper.element.remove();
      cover.element.classList.remove('visible');
      cover.addClass('hidden');
    }
    document.getElementById('closeBtn').addEventListener('click', () => hide());
    document.getElementById('cover').addEventListener('click', () => hide());
  };
  const addEvent = (response) => {
    response.photos.photo.forEach((prop) => {
      document.getElementById(prop.id)
        .addEventListener('click', (event) => {
          event.preventDefault();
          const id = event.target.getAttribute('data-id');
          const secret = event.target.getAttribute('data-secret');
          getImage(id, secret).then(res => buildLightBox(res));
        });
    });
  };
  return {
    addEvent,
  };
})();

export default getPhoto;
