import React from 'react';
var colors = ['#6A1B9A', '#76FF03', '#4527A0'];

var List = (props) => {
  return (
    <div>
      {props.users.map((user, i) => {
        return (
          <div key={i} style={{ color: colors[i % 3] }}>
            {user}
          </div>
        );
      })}
    </div>
  );
};

export default List;
