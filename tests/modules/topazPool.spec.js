import topazPool from '../../src/modules/topazPool';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require("chai-as-promised");

require('jsdom-global')();

chai.use(sinonChai);
chai.use(chaiAsPromised);
const { assert, expect, should } = require('chai');

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
        },
        "stat": "ok",
      };
      responseNegative = {
        "photos": {
          "stat": "ko"
        },
        "stat": "ko",
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
      handleResponse = sinon.spy(topazPool, 'handleResponse');
      renderResponse = sinon.stub(topazPool, 'renderResponse');
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
    it('should respond positively', function () {
      return expect(handleResponse(responsePositive)).to.eventually.be.fulfilled.then((res) => {
        expect(res).not.to.be.empty;
        expect(res).to.be.equal(responsePositive);
      });
    });
    it('should be called with a negative response', function () {
      return handleResponse(responseNegative).should.eventually.be.rejected.then((res) => {
        expect(handleResponse).to.be.calledOnce;
        expect(handleResponse).to.be.calledOnceWith(responseNegative);
        res.should.be.instanceof(Object);
      });
    });
    it('should respond negatively', function () {
      return assert.isRejected(handleResponse(responseNegative), Error, "Response is not OK: ko");
    });
  });
});
