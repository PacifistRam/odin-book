import { AuthContext } from "@/layout/MainLayout";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CircleUserRound } from "lucide-react";

import { getUserProfile, getUserPosts } from "@/utils/apiCalls";
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
  createdAt: Date;
  updatedAt: Date;
  content: string;
  deletedAt: null;
  authorId: number;
  _count: {
    comments: number;
    likes: number;
  };
  likes:[]
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
type ApiPostResponse = {
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  posts: Post[] | [];
};

const Profile = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [postLoading, setPostLoading] = useState<boolean>(false);
  const [morePostLoading, setMorePostLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [userPost, setUserPost] = useState<UserPost | null>(null);
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [postMetaData, setPostMetaData] = useState<PostMetaData>({
    totalPosts: 0,
    totalPages: 0,
    currentPage: 0,
  });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
      console.log("hello woiew");
    }
  }, [user.isAuthenticated, navigate]);

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

  const getPosts = async (
    page: number = 1,
    pageSize: number = 5,
    orderBy?: "asc" | "desc"
  ) => {
    setPostLoading(true);
    try {
      const response: ApiPostResponse = await getUserPosts(
        token,
        user.id,
        page,
        pageSize,
        orderBy
      );
      if (response) {
        setLocalPosts((prevPosts) =>
          page === 1 ? response.posts : [...prevPosts, ...response.posts]
        );
        setPostMetaData({
          totalPosts: response.totalPosts,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setPostLoading(false);
    }
  };

  const handleSortChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    getPosts(1, 5, value);
  };

  const loadMorePosts = async () => {
    if (postMetaData.totalPages > postMetaData.currentPage) {
      setMorePostLoading(true)
      const page = postMetaData.currentPage +1;
      const pageSize= 5;
      const orderBy = sortOrder
      try {
        const response: ApiPostResponse = await getUserPosts(
          token,
          user.id,
          page,
          pageSize,
          orderBy
        );
        if (response) {
          setLocalPosts((prevPosts) =>
            page === 1 ? response.posts : [...prevPosts, ...response.posts]
          );
          setPostMetaData({
            totalPosts: response.totalPosts,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
          });
        }
      } catch (err: any) {
        setError(err.message);
      }finally{
        setMorePostLoading(false)
      }
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
      getPosts(1);
    }
  }, [token]);

  // consoles the responses for now
  useEffect(() => {
    console.log(profile);
  }, [profile]);

  useEffect(() => {
    if (localPosts.length) {
      console.log("localPost: ", localPosts);
    }
  }, [localPosts]);

  // ////////////////////////////////

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
      <div className="flex gap-4 md:gap-6 lg:gap-7 items-center  p-4 pb-6 flex-wrap">
        <div className="flex-1 min-w-28 max-w-44">
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
              <span className="self-center">{postMetaData?.totalPosts}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="border-b border-border mb-4 px-4 py-5">{profile?.bio}</p>
      <Tabs defaultValue="posts" className="w-full space-y-4">
        <TabsList className="w-full text-xl">
          <TabsTrigger value="posts" className="w-1/2 space-x-1">
            <span>Posts</span>
            <span>({postMetaData?.totalPosts})</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="w-1/2 space-x-1">
            Comments
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="space-y-4">
            <Select onValueChange={handleSortChange} value={sortOrder}>
              <SelectTrigger className="w-40 ml-2">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Latest</SelectItem>
                <SelectItem value="asc">Oldest</SelectItem>
              </SelectContent>
            </Select>

            {postLoading ? (
              <div className="flex justify-center items-center py-4">
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                <span className="ml-2">Loading posts...</span>
              </div>
            ) : localPosts.length ? (
              <div>
                <UserPosts
                  posts={localPosts}
                  profilePic={profile?.profilePic}
                  userDetails={profile?.user}
                  loadMorePosts={loadMorePosts}
                  morePostLoading = {morePostLoading}
                  postMetaData = {postMetaData}
                />
              </div>
            ) : (
              <p>No user Posts found</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="comments">
          Comments will come here here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
