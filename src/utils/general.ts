export const isWindowExists = typeof window !== 'undefined';


export const getAgeGroup = (activityName:string) => {
    if (activityName.toLowerCase().includes('senior infants')) {
      return '3, 5, 7 years old';
    }
    return ''; 
  };

export const cleanDescription = (description: string): string => description.replace(/<[^>]*>?/gm, '');

export const pathStringToObject = (pathString:string) => {
  const parts = pathString.split('/');
  parts.shift(); 
  const [propertyName, propertyValue] = parts;
  return {
    [propertyName]: propertyValue,
  };
};

export const findKeyByValue = (arrayOfObjects:Record<string,string>[], valueToFind:string) => {
  for (const obj of arrayOfObjects) {
    for (const key in obj) {
      if (obj[key] === valueToFind) {
        return key;
      }
    }
  }
  return null; 
};