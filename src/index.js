import { API_URL, DETAILS } from './constants';
import topazPool from './modules/topazPool';
import getPhoto from './modules/getPhoto';

/**
 * Async function setting a text representing the status of loaded photo stream
 * @param {string} API endpoint
 * @param {object} API endpoint options
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

loadState("Loading");

fetchItems(API_URL, { ...DETAILS, ...{ per_page: 10 } })
  .then(response => getPhoto.addEvent(response))
  .catch(error => console.error(error))
  .finally(() => loadState(''));
