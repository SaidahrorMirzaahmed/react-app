import { useState } from "react";

export const Counter = () => {

    const[count, customSetCount] = useState(0);

    return (
        <button onClick = {() => customSetCount(count + 1)}>
            Count is {count}
        </button>
    );
}