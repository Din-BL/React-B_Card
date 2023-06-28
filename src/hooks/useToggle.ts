import { useState } from "react";

export function useToggle(): [boolean, () => void] {
    const [checked, setChecked] = useState(false)
    const toggle = () => {
        setChecked(currentCheck => !currentCheck)
    }
    return [checked, toggle]
}
