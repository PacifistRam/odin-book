import { AuthContext } from "@/layout/MainLayout";
import { useContext, useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CircleUserRound } from "lucide-react";

import { getUserProfile } from "@/utils/apiCalls";
import Posts from "./Posts";
import UserPosts from "@/components/UserPosts";

type ProfileData = {
  id: number | null;
  firstName?: string;
  lastName?: string;
  bio?: string;
  profilePic?: string;
  user: {
    id: number;
    userName: string;
  };
};
type PostMetaData = {
  totalPosts: number;
  currentPage: number;
  totalPages: number;
};

type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  deletedAt: null;
  authorId: number;
  _count: {
    comments: number;
    likes: number;
  };
};

// intersection of two types to create one type
type UserPost = PostMetaData & {
  posts: Post[];
};

type ApiResponse = {
  profile: ProfileData | null;
  postsData: {
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    posts: Post[] | [];
  };
};

const Profile = () => {
  const { token, user } = useContext(AuthContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [userPost, setUserPost] = useState<UserPost | null>(null);

  const getProfile = async () => {
    setLoading(true);
    try {
      const response: ApiResponse = await getUserProfile(token);
      setProfile(response.profile);
      console.log("profile", response);
      setUserPost(response.postsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  if (loading) {
    return (
      <div className="h-full flex justify-center items-center text-3xl">
        <p className=" flex gap-1 items-center">
          <span>Loading Profile</span>
          <AiOutlineLoading3Quarters className="animate-spin" />
        </p>
      </div>
    );
  }

  return (
    <div className=" border-r border-border min-h-full">
      <h2 className="py-4 border-b border-border pb-3 scroll-m-20 text-2xl font-semibold tracking-tight mb-2 first:mt-0 capitalize px-2">
        Profile
      </h2>
      <div className="flex gap-4 justify-center md:justify-evenly md:gap-0 items-center border-b border-border p-4 pb-6 flex-wrap">
        <div className="flex-1 min-w-28 max-w-44 md:max-w-52">
          {profile?.profilePic ? (
            <img
              src={profile?.profilePic}
              alt="profile picture"
              className="w-[100px] md:w-[200px] min-w-28 h-auto aspect-square object-cover rounded-full"
            />
          ) : (
            <div className="p-2 border rounded-xl bg-muted">
              <CircleUserRound className="w-full h-full text-primary" />
            </div>
          )}
        </div>
        <div className=" px-2">
          <span className="text-xl md:text-2xl flex gap-2">
            <span>@</span>
            {profile?.user.userName}
          </span>
          <div className="flex gap-2">
            <span className="capitalize">
              {profile?.firstName ? profile.firstName : ""}
            </span>
            <span className="capitalize">
              {profile?.lastName ? profile.lastName : ""}
            </span>
          </div>

          <div className="flex gap-4 text-lg mt-4">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold">Follows</span>
              <span className="self-center">0</span>{" "}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-extrabold">Followers</span>
              <span className="self-center">0</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-extrabold">Posts</span>
              <span className="self-center">{userPost?.totalPosts}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 px-2 border-b border-border">
        <h3 className="border-b border-border pb-3 scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
          Bio:
        </h3>
        <p>{profile?.bio}</p>
      </div>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full text-xl">
          <TabsTrigger value="posts" className="w-1/2 space-x-1">
           <span>Posts</span>
           <span>({userPost?.totalPosts})</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="w-1/2 space-x-1">
            Comments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          {userPost?.posts.length ? (
            <UserPosts postsData={userPost} />
          ) : (
            <p>No user Posts found</p>
          )}
        </TabsContent>
        <TabsContent value="comments">Comments will come here here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
