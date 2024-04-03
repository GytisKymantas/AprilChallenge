import { isWindowExists } from "./general";

const handleStorageError = (operation: string, key: string, error: Error): void => {
    console.error(`Error during ${operation} for key "${key}":`, error);
  };
  
  export const getFromSessionStorage = (key: string): string | null => {
    try {
      if (isWindowExists) {
        return window.sessionStorage.getItem(key);
      }
      return null;
    } catch (e) {
      handleStorageError('getting from sessionStorage', key, e);
      return null;
    }
  };
  
  export const setToSessionStorage = (key: string, value: string): void => {
    try {
      if (isWindowExists) {
        window.sessionStorage.setItem(key, value);
      }
    } catch (e) {
      handleStorageError('setting to sessionStorage', key, e);
    }
  };
  
  export const removeFromSessionStorage = (key: string): void => {
    try {
      if (isWindowExists) {
        window.sessionStorage.removeItem(key);
      }
    } catch (e) {
      handleStorageError('removing from sessionStorage', key, e);
    }
  };
  
  export const getFromLocalStorage = (key: string): string | null => {
    try {
      if (isWindowExists) {
        return window.localStorage.getItem(key);
      }
      return null;
    } catch (e) {
      handleStorageError('getting from localStorage', key, e);
      return null;
    }
  };
  
  export const setToLocalStorage = (key: string, value: string): void => {
    try {
      if (isWindowExists) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      handleStorageError('setting to localStorage', key, e);
    }
  };
  
  export const removeFromLocalStorage = (key: string): void => {
    try {
      if (isWindowExists) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      handleStorageError('removing from localStorage', key, e);
    }
  };