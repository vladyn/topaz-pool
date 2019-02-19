import { API_URL, KEY, DETAILS } from './constants';
import topazPool from './modules/topazPool';

// topazPool.fetchItems(API_URL, KEY, DETAILS)
//   .then(response => topazPool.handleResponse(response))
//   .then(response => topazPool.renderResponse(response))
//   .then(result => console.info(result))
//   .catch(error => console.error(error));

async function fetchItems(a, b, c) {
  const fetch = await topazPool.fetchItems(a, b, c);
  const handleResponse = await topazPool.handleResponse(fetch);
  const renderResponse = await topazPool.renderResponse(handleResponse);
  console.log(renderResponse);
}

fetchItems(API_URL, KEY, DETAILS)
  .then((response) => {
    console.log(response);
    document.getElementById('loader').textContent = 'Loading...';
  })
  .catch(error => console.error(error))
  .finally(() => {
    console.log('done');
    document.getElementById('loader').textContent = 'Done!';
  });
