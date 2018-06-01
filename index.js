const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state += action.value;
    case "DECREMENT":
      return state -= action.value;
    default:
      return state;

  }
};

const nameReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_NAME":
        return action.value
    default:
      return state;
  }
};



const {createStore} = Redux;


// Pass in a reducer argument

const store = createStore(nameReducer);




// const anotherStore = createStore(changeText);


const CounterComponent = ({count, onIncrement, onChange , onDecrement, upperCase, saveName}) => {

let input;
// ref={node => {input=node}} = Used to Access inside the input and change the input
  return (<div>
    <input type="text" ref={node => {input=node}}   />
    <br/>
    counter: {count}

    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
    <button onClick={() => saveName(input)}>Save Name</button><br/>
    Name : {upperCase}
  </div>)
};

const onIncrement = () => {
  store.dispatch({type: 'INCREMENT', value: 1})
};

const onDecrement = () => {
  store.dispatch({type: 'DECREMENT', value: 1})
};


// Used to change the state LIKE setState ({ })

// const onChange = () => {
//   anotherStore.dispatch({type: 'CHANGE', value: "a"})
// };


const nameSaved = (input) => {


  var upperCase = input.value.split('')

  upperCase = upperCase.map((each)=>{
    return each.toLowerCase()
  })

  upperCase[0] = upperCase[0].toUpperCase()

  upperCase = upperCase.join('')

  console.log(upperCase)

  store.dispatch({ type: "CHANGE_NAME" ,value: upperCase})
};


const render = () => {

  ReactDOM.render(<CounterComponent   upperCase={store.getState()} onIncrement={onIncrement} saveName={nameSaved} onDecrement={onDecrement} />, document.getElementById('root'));
};

store.subscribe(render);
// anotherStore.subscribe(render);


console.log(store);
// console.log(anotherStore);

render();
