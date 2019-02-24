const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
require('jsdom-global')();
import getPhoto from '../../src/modules/getPhoto';

chai.use(sinonChai);
const {
  expect, use, should, assert,
} = require("chai");

const response = {
  photos: {
    page: 1,
    pages: 1818,
    perpage: 100,
    photo: [{
      dateadded: "1550321946",
      farm: 6,
      id: "29927234372",
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      owner: "135636522@N07",
      ownername: "rvk82",
      secret: "f8e1b87aba",
      server: "5775",
      title: "_DSC3334"
    }],
    stat: "ok",
    total: "181701"
  }
}

describe("Add an event to the photo", function() {
  before('create stub', function(){
    sinon.stub(getPhoto, 'addEvent').callsFake(function some(){
      return response;
    });
  });
  after('clear the floor', function() {
    sinon.restore();
  });
  it('should test the call side', function () {
    getPhoto.addEvent(response);
    expect(getPhoto.addEvent).to.be.calledOnce;
    getPhoto.addEvent.should.be.calledOnceWith(response);
    getPhoto.addEvent.should.be.returned(response);
  });
});
