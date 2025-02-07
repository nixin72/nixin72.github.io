import React from 'react';

type Atom = {
    value: any;
}

function atom(this: any, value?: any) {
    this.atom = { value: value };
}

function deref(atom: Atom) {
    return atom.value;
}

export function useMd(url: string, setter: (val: any) => void) {
    React.useEffect(() => {
        fetch(url).then(res => res.text()).then(text => setter(text))
    }, []);
}