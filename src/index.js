import { API_URL, KEY, DETAILS } from './constants';
import topazPool from './modules/topazPool';
import getPhoto from './modules/getPhoto';

async function fetchItems(a, b, c) {
  const fetch = await topazPool.fetchItems(a, b, c);
  const handleResponse = await topazPool.handleResponse(fetch);
  const renderResponse = await topazPool.renderResponse(handleResponse);
  return renderResponse;
}

document.getElementById('loader').textContent = 'Loading...';

fetchItems(API_URL, KEY, DETAILS)
  .then(response => getPhoto.addEvent(response))
  .catch(error => console.error(error))
  .finally(() => {
    // TODO: Refactor this to a single function
    document.getElementById('loader').textContent = '';
  });
