import { KeyboardEvent as React } from "react";

export type ScrollEvent = { deltaY: number }
type KeycodeMap = {[key: number]: number}

const keys: KeycodeMap  = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e: Event) {
    //e.preventDefault();
}

function preventDefaultForScrollKeys(this: Window, e: KeyboardEvent): any {
    const keyCode: number = e.keyCode;
    if (keys[keyCode]) {
        //e.preventDefault();
        return false;
    }
}

const wheelOpt: AddEventListenerOptions = { passive: false };

// function disableScroll() {
//     window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
//     window.addEventListener('wheel', preventDefault, wheelOpt); // modern desktop
//     window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
//     window.addEventListener('keydown', preventDefaultForScrollKeys, false);
// }

// function enableScroll() {
//     window.removeEventListener('DOMMouseScroll', preventDefault, false);
//     window.removeEventListener('wheel', preventDefault, false);
//     window.removeEventListener('touchmove', preventDefault, false);
//     window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
// }

function addScrollEvent(eventListener: EventListener, preventDefault: () => boolean) {
    const wrappedEvent = (e: Event) => {
        const prevent = preventDefault();
        if (prevent) {
            e.preventDefault();
        }
        eventListener(e);
    }

    window.addEventListener('DOMMouseScroll', wrappedEvent, false);
    window.addEventListener('wheel', wrappedEvent, wheelOpt);
    window.addEventListener('touchmove', wrappedEvent, wheelOpt);
    window.addEventListener('keydown', wrappedEvent, false);
}

function removeScrollEvent(eventListener: EventListener) {
    window.addEventListener('DOMMouseScroll', eventListener, false);
    window.addEventListener('wheel', eventListener, wheelOpt);
    window.addEventListener('touchmove', eventListener, wheelOpt);
    window.addEventListener('keydown', eventListener, false);
}

export {
    // disableScroll, 
    // enableScroll, 
    addScrollEvent, 
    removeScrollEvent
}