import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchGamePin } from '../../reducers/GamePinReducer';
import Form from "../Form";

const GamePinInput = () => {
  const [gamePin, setGamePin] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const gamePinFromRedux = useSelector(state => state.gamePin.gamePin);

  const handleInputChange = (event) => {
    setGamePin(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Dispatch an action to fetch the game pin
    dispatch(fetchGamePin());

    // In your reducer, when the request is completed, update the state with the fetched game pin

    // Check if the game pin matches what was entered
    if (gamePinFromRedux === gamePin) {
      console.log('Success');
      // Navigate to the next step or perform further actions
    } else {
      setError('Incorrect game pin');
    }
  };

  return (
    <Form
      title="Please enter the game pin here:"
      buttonLabel="Join Game"
      value={gamePin}
      onChange={handleInputChange}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};



export default GamePinInput;
