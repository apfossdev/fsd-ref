import { useState, useEffect, useRef } from "react";

export const usePrev = (value) => {

    //Flow : First this happens
    const ref = useRef();

    //Finally it calls the useEffect
    useEffect(() => {
        ref.current = value; //1
    },[value]);

    //Second it returns
    return ref.current;

    //using this flow of React, we've declared the usePrev hook, but this has some issues
    //so we'll go ahead by using the hook from useHooks.com
}