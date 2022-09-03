export const getLocalItem = (itemName) => localStorage.getItem(itemName)

export const saveLocalItem = (itemName, itemValue) => localStorage.setItem(itemName, itemValue)

export const removeLocalItem = (itemName) => localStorage.removeItem(itemName)