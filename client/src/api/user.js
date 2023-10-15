


export const register = async ({username, email, password} = {}) =>{
    const user = {username, email,password};

    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/register`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        });

        return await res.json();
    }
    catch(err){
        throw new Error(`Cannot Regsiter at This Time. ${err}`);
    }
};

export const login = async ({email, password} = {}) =>{
    const user = {email,password};

    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/login`,{
            method:'POST',
            credentials:"include",
            headers:{
                Accept:'application/json',
                'Content-Type': "application/json"
            },
            body: JSON.stringify(user)
        });

        const response = await res.json();

        return response;
    }
    catch(err){
        throw new Error(`Cannot Login at This Time. ${err}`);
    }
};

export const logout = async () =>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "GET",
            credentials: "include",
        });
        return await res.json();
    }
    catch(err){
        console.log(err);
    }
};

export const getUser = async () =>{
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
            method: "GET",
            credentials: "include",
        });
        return await res.json();
    }
    catch(err){
        throw new Error("Pls Login to Continue");
    }
};

export const setProfile = async ({ fName, lName, phone, address, bloodType } = {}) => {
    const user = { fName, lName, phone, address, bloodType }; // Update the user data as needed
    try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/setprofile`, {
        method: 'POST',
        credentials:"include",
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!res.ok) {
        // Handle HTTP errors gracefully
        throw new Error(`Profile update failed. Status: ${res.status}`);
    }

    const responseData = await res.json();

    if (responseData.error) {
        // Handle API errors with a more informative message
        throw new Error(`Profile update error: ${responseData.error}`);
    }

    return responseData;
    } catch (err) {
      // Handle any other errors, e.g., network issues or unexpected exceptions
    console.error(`Profile update error: ${err.message}`);
    throw err;
    }
};

export const getProfile = async () => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/getprofile`,{
            method:"GET",
            credentials:"include"
        });
        return await res.json();
    }
    catch(e){
        throw new Error("Pls Login to Continue");
    }
};

