export const formatText = (text: string): string => {
    // Implement text formatting logic here
    return text.trim();
};

export const validateInput = (input: string): boolean => {
    // Implement input validation logic here
    return input.length > 0;
};

export const saveToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};