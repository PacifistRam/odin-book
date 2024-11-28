import { MessageSquareText, Heart } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { LikeUserPost, unLikeUserPost } from "@/utils/apiCalls";

import { AuthContext } from "@/layout/MainLayout";

import { postTimestamp } from "@/utils/dateFunctions";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

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
  likes: { userId: number }[];
};

type Likes = {
  likeCount: number;
  usersLiked: { userId: number }[];
};

const PostOverview = ({
  post,
  profilePic,
  userDetails,
}: {
  post: Post;
  profilePic?: string;
  userDetails?: { id: number; userName: string };
}) => {
  const { user, token } = useContext(AuthContext);
  const [likes, setLikes] = useState<Likes>({
    likeCount: post._count.likes,
    usersLiked: post.likes,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const hasLikedPost = (usersLiked: { userId: number }[]) => {
    return usersLiked.some((likedUser) => likedUser.userId === user.id);
  };

  const handleLike = async (likes: Likes) => {
    setIsLiking(true);
    if (hasLikedPost(likes.usersLiked)) {
      setLikes((prevLikes) => ({
        likeCount: prevLikes.likeCount - 1,
        usersLiked: prevLikes.usersLiked.filter(
          (likedUser) => likedUser.userId !== user.id
        ),
      }));
      try {
        const response = await unLikeUserPost(token, post.id);
        if (response) {
          setMessage(response.message);
        }
      } catch (err: any) {
        setError(err.message);
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
        const response = await LikeUserPost(token, post.id);
        if (response) {
          setMessage(response.message);
        }
      } catch (err: any) {
        setError(err.message);
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
    <div className="grid gap-2 px-2 py-4 hover:bg-accent rounded-xl shadow-sm border-b border-border transition-colors ">
      <div className="flex items-center gap-2">
        <Avatar className="h-7 w-7">
          <AvatarImage src={profilePic} alt="profile pic" />
          <AvatarFallback className="capitalize">
            {userDetails?.userName.substring(0, 1)}
          </AvatarFallback>
        </Avatar>
        <span>@{userDetails?.userName}</span>
        <span className="font-light text-sm opacity-50">
          Posted {postTimestamp(post.createdAt)}
        </span>
      </div>
      <Link to={`/user-home/post/${post.id}`}>
        <p className="py-2 text-lg whitespace-pre-wrap cursor-pointer">{post.content}</p>
      </Link>
      <div className="flex gap-8">
        <Button
          disabled={isLiking}
          variant={"ghost"}
          onClick={() => handleLike(likes)}
          className="flex gap-2 items-center hover:scale-105 transition-all "
        >
          <Heart
            size={18}
            color={hasLikedPost(likes.usersLiked) ? "#DC143C" : "currentColor"}
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
          <span>{post._count.comments}</span>
        </Button>
      </div>
    </div>
  );
};

export default PostOverview;
