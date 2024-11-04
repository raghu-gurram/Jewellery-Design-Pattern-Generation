import React, { useEffect, useRef } from 'react';

const MyComponent = () => {
    const myElementRef = useRef(null);

    useEffect(() => {
        const currentElement = myElementRef.current;

        // Ensure the element exists before adding an event listener
        if (currentElement) {
            const handleEvent = () => {
                console.log('Event triggered!');
            };

            currentElement.addEventListener('click', handleEvent);

            // Cleanup function to remove the event listener
            return () => {
                currentElement.removeEventListener('click', handleEvent);
            };
        }
    }, []); // Empty dependency array means this runs once after the first render

    return <div ref={myElementRef}>Click Me</div>;
};

export default MyComponent;
