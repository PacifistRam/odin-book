import { MessageSquareText, Heart } from "lucide-react";

import { postTimestamp } from "@/utils/dateFunctions";
import { Button } from "./ui/button";
import { useState } from "react";

type Post = {
  id: number;
  createdAt: Date;
  updatedAt: string;
  content: string;
  deletedAt: null;
  authorId: number;
  _count: {
    comments: number;
    likes: number;
  };
};

const PostOverview = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(true);

  const handleLike = () => {
    setLiked(prev => !prev)
  }
  return (
    <div className="grid gap-2 px-2 py-4 hover:bg-accent rounded-xl shadow-sm border-b border-border transition-colors">
      <p className="font-light text-sm opacity-50">
        Posted {postTimestamp(post.createdAt)}
      </p>
      <p className="py-2 text-lg whitespace-pre-wrap">{post.content}</p>
      <div className="flex gap-8">
        <Button
          variant={"ghost"}
          onClick={handleLike}
          className="flex gap-2 items-center hover:scale-105 transition-all "
        >
          <Heart
            size={18}
            color={liked ? "#DC143C" : "currentColor"}
            fill={liked ? "#DC143C" : "none"}
          />
          <span>{post._count.likes}</span>
        </Button>
        <Button
          variant={"ghost"}
          className="flex gap-2 items-center hover:scale-105 transition-all"
        >
          <MessageSquareText
            size={18}
            className="hover:scale-110 transition-all"
          />{" "}
          <span>{post._count.comments}</span>
        </Button>
      </div>
    </div>
  );
};

export default PostOverview;
