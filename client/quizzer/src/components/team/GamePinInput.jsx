import { useState } from "react";

const PinInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            id="gamePin"
            name="gamePin"
            value={value}
            onChange={onChange}
            placeholder="Game Pin..."
            style={{ textAlign: 'center' }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        />
    );
};

const GamePinInput = () => {
    const [gamePin, setGamePin] = useState("");

    const handleInputChange = (event) => {
        setGamePin(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the gamePin, like send it to the server to join the game
        console.log(`Joining game with pin: ${gamePin}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="mb-10">Please enter the game pin here:</h1>
            <PinInput value={gamePin} onChange={handleInputChange} />
            <button
                type="submit"
                className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
                Join Game
            </button>
        </form>
    );
};

export default GamePinInput;
