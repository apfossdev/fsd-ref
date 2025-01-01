import { atom, selector } from "recoil";

//syntax for atoms
export const counterAtom = atom({
    key: "counter",
    default: 0  
})

//syntax for selectors
export const evenSelector = selector({
    key:"isEvenSelector",
    get: ({ get }) => {
        const currentCount = get(counterAtom); //this selector is dependent on counterAtom, it derives it's state from counter atom
        const isEven = (currentCount % 2 == 0);
        return isEven;
    }
})

