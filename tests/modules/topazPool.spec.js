const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
require('jsdom-global')();
const chaiAsPromised = require("chai-as-promised");
import topazPool from '../../src/modules/topazPool';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const spy = sinon.spy();
chai.should();

describe("Tests for Requesting, responding and building the markup", function() {
  let fetchItems,
    fetchAsync,
    handleResponse,
    renderResponse,
    responsePositive,
    responseNegative;

  describe("Check the module behavior", function() {
    beforeEach(function () {
      responsePositive = {
        "photos": {
          "page": 1,
          "pages": 1818,
          "perpage": 100,
          "total": "181701",
          "photo": [
            {
              "id": "29927234372",
              "owner": "135636522@N07",
              "secret": "f8e1b87aba",
              "server": "5775",
              "farm": 6,
              "title": "_DSC3334",
              "ispublic": 1,
              "isfriend": 0,
              "isfamily": 0,
              "ownername": "rvk82",
              "dateadded": "1550321946"
            },
          ],
          "stat": "ok"
        }
      };
      responseNegative = {
        "photos": {
          "stat": "ko"
        }
      };
      fetchAsync = async function fetchAsync(url) {
        return new Promise((resolve, reject) => {
          if (url === 'ok') {
            resolve(responsePositive);
          } else if (url === 'ko') {
            reject(responseNegative);
          } else {
            reject('Something went wrong');
          }
        });
      };
      handleResponse = sinon.stub(topazPool, 'handleResponse').resolves(responsePositive);
      renderResponse = sinon.stub(topazPool, 'renderResponse').resolves(responsePositive);
    });
    afterEach(function () {
      fetchItems.restore();
      handleResponse.restore();
      renderResponse.restore();
    });
    it('should reject with an error from the response', function () {
      fetchItems = sinon.stub(topazPool, 'fetchItems').returns(fetchAsync('ko'));
      return expect(fetchItems()).to.eventually.be.rejected.then((error) => {
        expect(error.photos.stat).to.equal('ko');
      });
    });
    it('should reject with other error', function () {
      fetchItems = sinon.stub(topazPool, 'fetchItems').returns(fetchAsync('sad'));
      return expect(fetchItems()).to.eventually.be.rejected.then((error) => {
        expect(error).to.be.equal('Something went wrong');
      });
    });
    it('should fulfilled', function () {
      fetchItems = sinon.stub(topazPool, 'fetchItems').returns(fetchAsync('ok'));
      return expect(fetchItems()).to.eventually.be.fulfilled.then((res) => {
        expect(res).to.be.equal(responsePositive);
      });
    });
  });
});