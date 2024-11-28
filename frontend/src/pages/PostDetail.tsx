import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { MessageSquareText, Heart } from "lucide-react";

import { postTimestamp } from "@/utils/dateFunctions";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AuthContext } from "@/layout/MainLayout";

import {
  singlePost,
  LikeUserPost,
  unLikeUserPost,
  getComments,
  postComment,
} from "@/utils/apiCalls";
import CreateComment from "@/components/CreateComment";
import DisplayComments from "@/components/DisplayComments";
import BackNav from "@/components/BackNav";

type Post = {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    userName: string;
    profile: {
      profilePic: string;
    };
  };
  likes: { userId: number }[] | [];
};

type PostData = {
  post: Post;
  totalComments: number;
  totalLikes: number;
};
type Likes = {
  likeCount: number;
  usersLiked: { userId: number }[] | [];
};

type ComentsData = {
  totalComments: number;
  comments:
    | {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        postId: number;
        text: string;
        commenter: {
          id: number;
          userName: string;
          profile: {
            profilePic: string;
          };
        };
      }[]
    | [];
};

const PostDetail = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const [userPost, setUserPost] = useState<PostData | null>(null);
  const [likes, setLikes] = useState<Likes>({
    likeCount: 0,
    usersLiked: [],
  });
  const [postError, setPostError] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [likeMessage, setLikeMessage] = useState<string | null>(null);

  const [userComments, setUserComments] = useState<ComentsData | null>(null);

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated]);

  const fetchPost = async () => {
    setPostLoading(true);
    try {
      const response = await singlePost(Number(postId));
      if (response.data) {
        console.log("response: ", response);
        setUserPost(response.data);
        setLikes({
          likeCount: response.data.totalLikes,
          usersLiked: response.data.post.likes,
        });
      }
    } catch (err: any) {
      setPostError(err.message);
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await getComments(Number(postId));
      if (response.data) {
        setUserComments(response.data);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
      console.log("userComments : ", userComments);
  },[userComments]);

  useEffect(() => {
    if (userPost) {
      fetchComments();
    }
  }, [userPost, postId]);

  const createComment = async (comment: string) => {
    try {
      if (postId) {
        const response = await postComment(token, comment, Number(postId));
        if (response) {
          fetchComments();
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const hasLikedPost = (usersLiked: { userId: number }[]) => {
    return usersLiked.some((likedUser) => likedUser.userId === user.id);
  };

  const handleLike = async (likes: Likes) => {
    setIsLiking(true);
    const postId = userPost?.post.id;
    if (hasLikedPost(likes.usersLiked)) {
      setLikes((prevLikes) => ({
        likeCount: prevLikes.likeCount - 1,
        usersLiked: prevLikes.usersLiked.filter(
          (likedUser) => likedUser.userId !== user.id
        ),
      }));
      try {
        if (postId) {
          const response = await unLikeUserPost(token, postId);
          if (response) {
            setLikeMessage(response.message);
          }
        }
      } catch (err: any) {
        setPostError(err.message);
        setLikes((prevLikes) => ({
          likeCount: prevLikes.likeCount + 1,
          usersLiked: [...prevLikes.usersLiked, { userId: user.id }],
        }));
      } finally {
        setIsLiking(false);
      }
    } else {
      setLikes((prevLikes) => ({
        likeCount: prevLikes.likeCount + 1,
        usersLiked: [...prevLikes.usersLiked, { userId: user.id }],
      }));
      try {
        if (postId) {
          const response = await LikeUserPost(token, postId);
          if (response) {
            setLikeMessage(response.message);
          }
        }
      } catch (err: any) {
        setPostError(err.message);
        setLikes((prevLikes) => ({
          likeCount: prevLikes.likeCount - 1,
          usersLiked: prevLikes.usersLiked.filter(
            (likedUser) => likedUser.userId !== user.id
          ),
        }));
      } finally {
        setIsLiking(false);
      }
    }
  };

  return (
    <div>
      <BackNav />
      {!postLoading ? (
        <div className="grid gap-2 px-2 py-4 rounded-xl shadow-sm mb-2 md:mb-3  transition-colors ">
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              <AvatarImage
                src={userPost?.post.author.profile.profilePic}
                alt="profile pic"
              />
              <AvatarFallback className="capitalize">
                {userPost?.post.author.userName.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span>@{userPost?.post.author.userName}</span>
            {userPost?.post.createdAt && (
              <span className="font-light text-sm opacity-50">
                Posted {postTimestamp(userPost?.post.createdAt)}
              </span>
            )}
          </div>
          <p className="py-2 text-lg whitespace-pre-wrap cursor-pointer">
            {userPost?.post.content}
          </p>
          <div className="flex gap-8">
            <Button
              disabled={isLiking}
              variant={"ghost"}
              onClick={() => handleLike(likes)}
              className="flex gap-2 items-center hover:scale-105 transition-all "
            >
              <Heart
                size={18}
                color={
                  hasLikedPost(likes.usersLiked) ? "#DC143C" : "currentColor"
                }
                fill={hasLikedPost(likes.usersLiked) ? "#DC143C" : "none"}
              />
              <span>{likes.likeCount}</span>
            </Button>
            <Button
              variant={"ghost"}
              className="flex gap-2 items-center hover:scale-105 transition-all"
            >
              <MessageSquareText
                size={18}
                className="hover:scale-110 transition-all"
              />
              <span>{userComments?.totalComments}</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-4 space-x-4 flex-col">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-6 w-[250px]" />
          </div>
          <Skeleton className="h-16 w-full" />
        </div>
      )}
      {!postLoading && (
        <div className="px-2 py-2">
          <div className="mb-3 border-b border-border pb-4">
            <CreateComment handleCreateComment={createComment} />
          </div>
          {
            userComments?.comments ?
            <DisplayComments
              commentsData = {userComments} />
              : <p className="text-center font-light p-2"> No comments </p>
          }
        </div>
      )}
    </div>
  );
};

export default PostDetail;
