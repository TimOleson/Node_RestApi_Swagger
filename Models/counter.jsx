function Button(props) {
  const handdleClick = () => props.OnclickFunc(props.increment);
  return <button onClick={handdleClick}>+{props.increment}</button>;
}

function Display(props) {
  return <div>{props.message}</div>;
}

const pagetitle = "Tims Reaction";



const PageHeader = () => (
  <div>
    <div className="container">
      <h1>{pagetitle}</h1>
    </div>
  </div>
);


function App() {
  const [counter, setCounter] = useState(0);
  const incrementCounter = incrementValue =>
    setCounter(counter + incrementValue);
  return (
    <>
       <PageHeader />
      <Button OnclickFunc={incrementCounter} increment={5} />
      <Button OnclickFunc={incrementCounter} increment={10} />
      <Button OnclickFunc={incrementCounter} increment={15} />
      <Button OnclickFunc={incrementCounter} increment={20} />
      <Display message={counter} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("mountNode"));







import React from "react";
import PropTypes from "prop-types";

const counter = props => {
  return <div></div>;
};

counter.propTypes = {};

export default counter;
