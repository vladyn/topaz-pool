// Html wrapper element constructor
function HtmlElement(el) {
  this.element = (el instanceof HTMLElement) ? el : document.createElement(el);
}

// Create chainable element
HtmlElement.create = function create(el) {
  return new HtmlElement(el);
};

// Adding an id
HtmlElement.prototype.addId = function addId(id) {
  this.element.id = id || '';
  return this;
};

// Adding a single class
HtmlElement.prototype.addClass = function addClass(className) {
  if (className) this.element.classList.add(className);
  return this;
};

// Add multiple classes. Use of rest parameter
// allows classNames to be either a comma-
// separated list or an array of args.
HtmlElement.prototype.addClasses = function addClasses(...classNames) {
  if (!classNames[0]) return this;
  for (const className of classNames[0]) {
    this.addClass(className);
  }
  return this;
};

// Adding a text content
HtmlElement.prototype.addText = function addText(text = '') {
  this.element.textContent = text;
  return this;
};

// Create a picture element
HtmlElement.prototype.addPicture = function addPicture(details) {
  const {
    src: s, srcset: ss, title: t, href: h, media: m,
  } = details;
  const link = document.createElement('a');
  const picture = document.createElement('picture');
  const img = document.createElement('img');
  ss.forEach((value, index) => {
    const source = document.createElement('source');
    source.media = m[index];
    source.srcset = value;
    picture.appendChild(source);
  });
  [img.src, link.title, link.href, img.alt] = [s, t, h, t];
  picture.appendChild(img);
  link.appendChild(picture);
  this.element.appendChild(link);
  return this;
};

// Adding a single element with attributes
HtmlElement.prototype.addChild = function addChild(args) {
  const element = HtmlElement.create(args.element)
    .addId(args.id)
    .addClass(args.class)
    .addClasses(args.classes)
    .addText(args.textContent);
  this.append(element);
  return this;
};

HtmlElement.prototype.addExtendedChild = function addExtendedChild(args) {
  const element = HtmlElement.create(args.element)
    .addId(args.id)
    .addClass(args.class)
    .addClasses(args.classes)
    .addText(args.textContent)
    .addPicture(args.picture)
    .addLink(args.meta.title)
    .addLink(args.meta.author);
  this.append(element);
  return this;
};

// Adding a hyperlink the it's attributes
HtmlElement.prototype.addLink = function addLink(details) {
  const {
    href: h, title: t, elementWrapper: e, className: c,
  } = details;
  const span = HtmlElement.create(e).addClass(c);
  const link = HtmlElement.create('a');
  link.element.href = h;
  link.element.title = t;
  link.addText(t);
  span.append(link);
  this.append(span);
  return this;
};

// Get a child of an element
HtmlElement.prototype.getChild = function getChild(selector) {
  return new HtmlElement(this.element.querySelector(selector));
};

// Appends the element's inner property to the HtmlElement
HtmlElement.prototype.append = function append(htmlElement) {
  this.element.appendChild(htmlElement.element);
};

// Append the htmlElement to a DOM element
HtmlElement.prototype.appendTo = function appendChild(domElement) {
  domElement.appendChild(this.element);
};

export default HtmlElement;
