const nameReducer = (state = "Reduxing", action) => {
  switch (action.type) {
    case "CHANGE_NAME":
        return action.value
    default:
      return state;
  }
};


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


// Combining the two reducers into One
const rootReducer = (state = {} ,action) => {
  return {

// State here is an object {
// counter : return value from counterReducer 
// name : return value nameReducer }

    counter : counterReducer(state.counter, action),
    name : nameReducer(state.name, action)
  }

}

const {createStore} = Redux;

// Pass in a reducer argument

const store = createStore(rootReducer);



const CounterComponent = ({state, onIncrement, onChange , onDecrement, upperCase, saveName}) => {



let input;
// ref={node => {input=node}} = Used to Access inside the input and change the input
  return (<div>
    <input type="text" ref={node => {input=node}}   />
    <button onClick={() => saveName(input)}>Save Name</button><br/>
      Name : {upperCase.name}
    <br/>
    counter: {upperCase.counter}<br/>



    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button><br/>


  </div>)
};


// Dispatch an Action Parameter Object with type(required) & value (can be multiple)

const onIncrement = () => {
  store.dispatch({type: 'INCREMENT', value: 1})
};

const onDecrement = () => {
  store.dispatch({type: 'DECREMENT', value: 1})
};


// Used to change the state similar to setState ({ })

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

  ReactDOM.render(<CounterComponent upperCase={store.getState()}
  onIncrement={onIncrement} saveName={nameSaved} onDecrement={onDecrement} />,
  document.getElementById('root'));
};


// Redux communicates with React via store.subscribe

store.subscribe(render);


console.log(store);

render();
