import '../styles/index.scss';
import { API_URL, DETAILS } from './constants';
import topazPool from './modules/topazPool';
import getPhoto from './modules/getPhoto';

/**
 * Async function setting a text representing the status of loaded photo stream
 * @param a {string} API endpoint
 * @param b {object} API endpoint options
 * @return Promise
 */
async function fetchItems(a, b) {
  const fetch = await topazPool.fetchItems(a, b);
  const handleResponse = await topazPool.handleResponse(fetch);
  const renderResponse = await topazPool.renderResponse(handleResponse);
  return renderResponse;
}

/**
 * Function setting a text representing the status of loaded photo stream
 * @param {string} message - a status of the loaded content
 */
const loadState = (message = 'loading') => {
  const loader = document.getElementById('loader');
  if (message !== '') {
    loader.textContent = message.padEnd(10, '.');
  } else {
    loader.textContent = message;
  }
};

let page = 1;

/**
 * Function watching the DOM loaded state
 * @state readystatechange | complete
 */
document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'interactive') {
    loadState("Loading");
  } else if (event.target.readyState === 'complete') {
    fetchItems(API_URL, { ...DETAILS })
      .then(response => getPhoto.addEvent(response))
      .catch(error => console.error(error))
      .finally(() => loadState(''));

    /**
     * Function adding pagination functionality
     * @element button in use to load more
     */
    document.getElementById('more').addEventListener('click', () => {
      page += 1;
      fetchItems(API_URL, { ...DETAILS, ...{ page } })
        .then(response => getPhoto.addEvent(response))
        .catch(error => console.error(error))
        .finally(() => loadState(`page ${page}`));
    });
  }
});

export { fetchItems, loadState };
