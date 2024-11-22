const baseUrl = import.meta.env.VITE_BASE_URL

type LoginFields = {
    email: string,
    password: string,
}
type UserData = {
    email: string,
    userName: string,
    password: string,
}
type Token = string
// type ApiResponse =




type ApiOptions = RequestInit;

const apiCall = async(endpoint:string, options:ApiOptions) => {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, options);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }
        return response.json();
    } catch (error) {
        throw error
    }
}

export const login = (loginFields:LoginFields) => {
    return apiCall('/auth/log-in', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(loginFields),
    })
}
export const signUp = (userData: UserData) => {
    return apiCall('/auth/sign-up', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(userData),
    })
}

export const verifyToken = (token: Token) =>{
    return apiCall('/auth/auth-user',{
        method: 'Get',
        headers:{ Authorization: `Bearer ${token}`}
    })
}

export const createPost = (token: Token, content: string) => {
    return apiCall('/api/post/create-post',{
        method: 'POST',
        headers:{ 
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({content})
    })
}

export const getUserProfile = (token:Token) => {
    return apiCall('/api/profile/authUser-profile',{
        method: 'GET',
       headers: { Authorization: `Bearer ${token}`},
    })
}