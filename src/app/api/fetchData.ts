export const fetchCardData = async (externaldata:string) => {
    const res = await fetch(
      `https://dev-api.exoclass.com/api/v1/en/groups/${externaldata}`
    );
    const data = await res.json();
  
    return data;
  };

  export const fetchCardDataTwo = async () => {
    const res = await fetch(
        'https://dev-api.exoclass.com/api/v1/en/groups?provider_key=7792d545-2bc6-4ee6-b96e-51bdf1d0d855'
        );
    const data = await res.json();
  
    return data;
  };