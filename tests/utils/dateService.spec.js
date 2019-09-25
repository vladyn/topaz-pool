import dateFUT from '../../src/utils/dateService';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = require('chai');

const normalizedDate = sinon.spy(dateFUT);
const unixTs = '1550648442';

describe("it should return date from a unix timestamp", function() {
  normalizedDate(unixTs);
  it('should be called once', function () {
    expect(normalizedDate.called).to.be.true;
    expect(normalizedDate.calledWithExactly(unixTs)).to.be.true;
  });
  it('should return converted date', function () {
    expect(normalizedDate.called).to.be.true;
    expect(normalizedDate.returnValues[0]).should.not.be.empty;
  });
});
