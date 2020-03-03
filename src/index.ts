const
  recursiveEach = (childNodes: NodeListOf<ChildNode>, fn: (childNode: ChildNode) => any) => {
    Array.prototype.slice.call(childNodes)
      .forEach(childNode => {
        fn(childNode);

        childNode.hasChildNodes() && recursiveEach(childNode.childNodes, fn);
      });
  };

const
  berthit = (content: string, options = { target: '_self' }) => {
    const
      div = document.createElement('div'),
      id = +`${Math.random()}`.replace(/[^\d]/g, '');

    div.innerHTML = content
      .replace(/((?:src|href)=(["'])[^\1]*?\2)/gim, `data-attr${id}-$1`);

    recursiveEach(div.childNodes, (childNode: ChildNode) => {
      if (childNode?.nodeType === 3) {
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

export default berthit;
