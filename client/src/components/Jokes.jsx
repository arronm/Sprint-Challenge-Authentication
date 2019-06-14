import React from 'react';

const Jokes = (props) => {
  return (
    <>
      <h1>Dad Jokes!</h1>
      {
        props.jokes.map(joke => <div key={joke.id}>{joke.joke}</div>)
      }
    </>
  );
}
 
export default Jokes;
