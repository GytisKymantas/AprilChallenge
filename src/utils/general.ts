export const isWindowExists = typeof window !== 'undefined';


export const getAgeGroup = (activityName) => {
    if (activityName.toLowerCase().includes('senior infants')) {
      return '3, 5, 7 years old';
    }
    return ''; // Return empty string if 'senior infants' is not found in the name
  };

export const cleanDescription = (description: string): string => description.replace(/<[^>]*>?/gm, '');

export const pathStringToObject = (pathString) => {
  const parts = pathString.split('/');
  parts.shift(); // Remove the empty string at the beginning
  const [propertyName, propertyValue] = parts;
  return {
    [propertyName]: propertyValue,
  };
};