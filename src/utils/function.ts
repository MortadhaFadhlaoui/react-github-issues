export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

export const randomColor =()=> Math.floor(Math.random() * 16777215).toString(16)
