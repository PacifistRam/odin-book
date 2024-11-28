const baseUrl = import.meta.env.VITE_BASE_URL;

type LoginFields = {
  email: string;
  password: string;
};
type UserData = {
  email: string;
  userName: string;
  password: string;
};
type Token = string;
// type ApiResponse =

type ApiOptions = RequestInit;

const apiCall = async (endpoint: string, options: ApiOptions) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, options);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const login = (loginFields: LoginFields) => {
  return apiCall("/auth/log-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginFields),
  });
};
export const signUp = (userData: UserData) => {
  return apiCall("/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const verifyToken = (token: Token) => {
  return apiCall("/auth/auth-user", {
    method: "Get",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createPost = (token: Token, content: string) => {
  return apiCall("/api/post/create-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });
};

export const getUserProfile = (token: Token) => {
  return apiCall("/api/profile/authUser-profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getUserPosts = (
  token: Token,
  userId: number | null,
  page: number = 1,
  pageSize: number = 5,
  orderBy: "asc" | "desc" = "desc"
) => {
  return apiCall(
    `/api/post/user-posts/${userId}?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const singlePost = (postId: number) => {
  return apiCall(`/api/post/post/${postId}`,{
    method: "GET"
  })
}

export const getComments = (postId: number) => {
  return apiCall(`/api/post/comments/${postId}`,{
    method: "GET"
  })
}

export const postComment = (token: Token, comment: string, postId: number) => {
  return apiCall(`/api/post/create-comment`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({ comment, postId }) 
    })
}

export const LikeUserPost = (token: Token, postId: number) => {
  return apiCall(`/api/post/like-post`,{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({postId})
  })
}

export const unLikeUserPost = (token: Token, postId: number) => {
  return apiCall(`/api/post/unlike-post`,{
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify({postId})
  })
}