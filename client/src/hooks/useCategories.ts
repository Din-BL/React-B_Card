import { useEffect, useState } from "react"
import { getData, setData } from "../utils/localStorage"

export function useCategories() {
    const [categories, setCategories] = useState(null)

    function changeCategory(event: React.ChangeEvent<{}>, newValue: any) {
        setCategories(newValue)
        setData('category', newValue)
    }

    useEffect(() => {
        const categoriesValue = getData('category')
        categoriesValue && setCategories(categoriesValue);
    }, [])

    return { categories, changeCategory }
}