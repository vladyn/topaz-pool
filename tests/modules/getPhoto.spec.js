import getPhoto from "../../src/modules/getPhoto";

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
require('jsdom-global')();
const chaiAsPromised = require("chai-as-promised");
// import getPhoto from '../../src/modules/getPhoto';

chai.use(sinonChai);
chai.use(chaiAsPromised);
const {
  expect, use, should, assert,
} = require("chai");

const response = {
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
    "stat": "ok",
  },
};

describe("Add an event to the photo", function() {
  before('create stub', function(){
    sinon.stub(getPhoto, 'addEvent').callsFake(function fakeFunction() {
      return 42;
    });
  });
  after('clear the floor', function() {
    sinon.restore();
  });
  it('should attach an event to the photo link', function () {
    getPhoto.addEvent();
    getPhoto.addEvent.should.be.calledOnceWith(response);
    console.log(getPhoto.addEvent(response));
  });
});
