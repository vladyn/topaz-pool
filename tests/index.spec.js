/* global it, describe, beforeEach, afterEach */
import { fetchItems, loadState } from "../src";
import getPhoto from "../src/modules/getPhoto";

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiAsPromised = require("chai-as-promised");

chai.use(sinonChai);
chai.use(chaiAsPromised);

const { expect, assert } = require('chai');

describe('Tests checking the initial state of the application', () => {
  it('should init the app', () => {
    expect(fetchItems).to.be.a('function');
  });
  it('should have ability to set a loader state', () => {
    expect(loadState).to.be.a('function');
  });
});
