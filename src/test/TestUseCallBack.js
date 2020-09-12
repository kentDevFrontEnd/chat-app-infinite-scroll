import React, { useState, useCallback } from "react";

function TestUseCallBack() {
  const [count, setCount] = useState(0);
  const [anotherCount, setAnotherCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decrement = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  const incrementAnotherCount = useCallback(() => {
    setAnotherCount(anotherCount + 1);
  }, [anotherCount]);

  console.log(count);

  return (
    <div>
      count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={incrementAnotherCount}>Add</button>
    </div>
  );
}

export default TestUseCallBack;
