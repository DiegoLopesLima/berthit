"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }const
  recursiveEach = (childNodes, fn) => {
    Array.prototype.slice.call(childNodes)
      .forEach(childNode => {
        fn(childNode);

        childNode.hasChildNodes() && recursiveEach(childNode.childNodes, fn);
      });
  };

const
  berth = (content, options = { target: '_self' }) => {
    const
      div = document.createElement('div'),
      id = +`${Math.random()}`.replace(/[^\d]/g, '');

    div.innerHTML = content
      .replace(/((?:src|href)=(["'])[^\1]*?\2)/gim, `data-attr${id}-$1`);

    recursiveEach(div.childNodes, (childNode) => {
      if (_optionalChain([childNode, 'optionalAccess', _ => _.nodeType]) === 3) {
        childNode.nodeValue = childNode.nodeValue
          .replace(
            /((?:[^\W\_]+:\/\/)(?:[\w\-]+)(?:\.[\w\-]+)*(?:\:\d{2,4})?(?:\/[\w\-]+)*(?:\?(?:[\w\-]+(?:=[\w\-]+)?)(?:\&[\w\-]+(?:=[\w\-]+)?)*)?(?:#[\w\-]*)?)/gm,
            `[a-${id} href="$1" target="${options.target}"]$1[/a-${id}]`
          );
      }
    });

    return div.innerHTML
      .replace(new RegExp(`data-attr${id}-`, 'g'), '')
      .replace(new RegExp(`\\[a-${id}([^\\]]*)\\]`, 'g'), '<a$1>')
      .replace(new RegExp(`\\[\/a-${id}\\]`, 'g'), '</a>');
  };

exports. default = berth;
