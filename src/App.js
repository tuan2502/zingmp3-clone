import {useSelector, useDispatch} from 'react-redux';

const App = () => {

  const {test} = useSelector(state => state.app)
  console.log(test)
  return (
    <div className="text-3xl font-bold underline">
      Hello world!

    </div>
  );
}

export default App;
