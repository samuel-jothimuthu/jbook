export const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export const cumulativeCodeHelper = (cells: any, cell: any) => {
  const { data, order } = cells;
  const orderedCells = order.map((id: string) => data[id]);

  const showFunc = `
  import _React from 'react';
  import _ReactDOM from 'react-dom';
  var show = (value) => {
    const root = document.querySelector("#root");

    if (typeof value === 'object') {
      if(value.$$typeof &&  value.props) {
        _ReactDOM.render(value, root);
      }
       else {
        root.innerHTML = JSON.stringify(value);
       }
    } else {
      root.innerHTML = value;
    }
  };
  `;

  const showFuncNoop = `var show = () => {}`;
  const cumulativeCode = [];
  for (let c of orderedCells) {
    if (c.type === 'code') {
      if (c.id === cell.id) {
        cumulativeCode.push(showFunc);
      } else {
        cumulativeCode.push(showFuncNoop);
      }
      cumulativeCode.push(c.content);
    }
    if (c.id === cell.id) {
      break;
    }
  }
  return cumulativeCode;
};
