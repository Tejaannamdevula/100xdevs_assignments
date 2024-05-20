import { useCallback, useState } from "react";
import { memo } from "react";
// Create a counter component with increment and decrement functions. Pass these functions to a child component which has buttons to perform the increment and decrement actions. Use useCallback to ensure that these functions are not recreated on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);

  // Your code starts here
  //   function handleIncrement() {
  //     setCount(count + 1);
  //   }
  const handleIncrement = useCallback(() => {
    setCount((count) => count + 1);
  }, []);

  //   function handleDecrement() {
  //     setCount(count - 1);
  //   }

  const handleDecrement = useCallback(() => {
    setCount((count) => count - 1);
  }, []);
  // Your code ends here

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

const CounterButtons = memo(({ onIncrement, onDecrement }) => (
  <div>
    {console.log("hello")}
    <button onClick={onIncrement}>Increment</button>
    <button onClick={onDecrement}>Decrement</button>
  </div>
));
