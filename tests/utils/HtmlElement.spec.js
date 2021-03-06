/* global it, describe, beforeEach, afterEach */
import HtmlElement from '../../src/utils/HtmlElement';

const chai = require('chai');
const sinonChai = require('sinon-chai');

require('jsdom-global')();

chai.use(sinonChai);
const { expect } = require('chai');

describe("Tests for HtmlElement constructor function", function() {
  let ul;

  beforeEach("instantiate an instance of a html element", function() {
    ul = (new HtmlElement('ul'));
  });

  describe("Create and return an html element", function() {
    it('have a constructor function', function () {
      expect(HtmlElement).to.be.a('function');
    });
    it('should have a create method', function () {
      expect(HtmlElement.create).to.be.a('function');
    });
    it('should create an html element', function () {
      ul.element.should.have.property("outerHTML").equal("<ul></ul>");
      ul.element.should.be.instanceof(HTMLElement);
    });
    it('should add an id to the html element', function () {
      ul.addId('some');
      ul.element.should.have.property("outerHTML").equal('<ul id="some"></ul>');
    });
    it('should add a class to the html element', function () {
      ul.addClass('some');
      ul.element.should.have.property("outerHTML").equal('<ul class="some"></ul>');
    });
    it('should add a classes to the html element', function () {
      ul.addClasses(['some', 'other']);
      ul.element.should.have.property("outerHTML").equal('<ul class="some other"></ul>');
    });
    it('should add a htmlContent', function () {
      const div = (new HtmlElement('div'));
      div.addHtml('<p>some</p>');
      div.element.should.have.property("outerHTML").equal('<div><p>some</p></div>');
    });
    it('should add a child to the html element', function () {
      const elAttributes = {
        element: 'li',
        id: 'stream-wrapper',
        class: 'my-custom-class',
        classes: [
          'some',
          'other',
        ],
      };
      ul.addChild(elAttributes);
      ul.element.should.have.property("outerHTML").equal('<ul><li id="stream-wrapper" class="my-custom-class some other"></li></ul>');
    });
    it('should add an extended child to the html element', function () {
      const elAttributes = {
        element: 'li',
        picture: {
          src: `farm.jpg`,
          media: [
            '(max-width: 639px)',
          ],
          srcset: [
            `farm_q.jpg`,
          ],
          href: `farm.jpg`,
          title: 'prop.title',
          id: 'prop.id',
          secret: 'prop.secret',
        },
        meta: {
          title: {
            title: 'prop.title',
            href: `farm.jpg`,
            elementWrapper: 'span',
            className: 'photo-title',
          },
          author: {
            title: 'prop.ownername',
            href: `flickr.com/prop.owner`,
            elementWrapper: 'span',
            className: 'photo-author',
          },
        },
      };
      ul.addExtendedChild(elAttributes);
      ul.element
        .should
        .have
        .property("outerHTML")
        .equal('<ul><li><a title="prop.title" href="farm.jpg"><picture><source media="(max-width: 639px)" srcset="farm_q.jpg"><img src="farm.jpg" alt="prop.title" id="prop.id" data-id="prop.id" data-secret="prop.secret"></picture></a><span class="photo-title"><a href="farm.jpg" title="prop.title">prop.title</a></span><span class="photo-author"><a href="flickr.com/prop.owner" title="prop.ownername">prop.ownername</a></span><div class="photo-date"></div></li></ul>');
    });
  });

  describe("Checks element methods presence on the prototype", function(){
    it('should have addClass method', function () {
      ul.should.have.property("addClass").be.a("function");
    });
    it('should have addClasses method', function () {
      expect(HtmlElement.prototype.addClasses).to.be.a('function');
    });
    it('should have addChild method', function () {
      expect(HtmlElement.prototype.addChild).to.be.a('function');
    });
    it('should have addExtendedChild method', function () {
      expect(HtmlElement.prototype.addExtendedChild).to.be.a('function');
    });
    it('should have addLink method', function () {
      expect(HtmlElement.prototype.addLink).to.be.a('function');
    });
    it('should have addId method', function () {
      expect(HtmlElement.prototype.addId).to.be.a('function');
    });
    it('should have addText method', function () {
      expect(HtmlElement.prototype.addText).to.be.a('function');
    });
    it('should have addHtml method', function () {
      expect(HtmlElement.prototype.addHtml).to.be.a('function');
    });
    it('should have addLink method', function () {
      expect(HtmlElement.prototype.addLink).to.be.a('function');
    });
    it('should have addPicture method', function () {
      expect(HtmlElement.prototype.addPicture).to.be.a('function');
    });
    it('should have getChild method', function () {
      expect(HtmlElement.prototype.getChild).to.be.a('function');
    });
    it('should have append method', function () {
      expect(HtmlElement.prototype.append).to.be.a('function');
    });
    it('should have appendTo method', function () {
      expect(HtmlElement.prototype.appendTo).to.be.a('function');
    });
  });
});
