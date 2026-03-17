import React, { useEffect, useState } from 'react';

const Button = ({ text = "button" }) => {
    const [click, setClick] = useState(0)

    useEffect(() => {
        document.title = `You've clicked ${click}` // componentDidUpdate/componentDidMount analog
    })

    console.log(click)
    return <button onClick={() => setClick(click + 1)}>{text} {click}</button>;
};


export default Button