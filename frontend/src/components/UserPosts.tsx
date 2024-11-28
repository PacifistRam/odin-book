import PostOverview from "./ PostOverview";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

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
type PostMetaData = {
  totalPosts: number;
  currentPage: number;
  totalPages: number;
};

// intersection of two types to create one type

const UserPosts = ({
  posts,
  profilePic,
  userDetails,
  loadMorePosts,
  morePostLoading,
  postMetaData,
}: {
  posts: Post[];
  profilePic?: string;
  userDetails?: { id: number; userName: string };
  loadMorePosts: () => void;
  morePostLoading: boolean;
  postMetaData: PostMetaData;
}) => {
  return (
    <div className="grid gap-2 ">
      {posts.map((post) => (
        <div key={post.id}>
          <PostOverview
            post={post}
            profilePic={profilePic}
            userDetails={userDetails}
          />
        </div>
      ))}
      {postMetaData.currentPage !== postMetaData.totalPages && (
        <Button
          disabled={morePostLoading}
          onClick={loadMorePosts}
          className="place-self-center"
        >
          {morePostLoading ? <Loader className="animate-spin" /> : <span> Load More</span>}
        </Button>
      )}
    </div>
  );
};

export default UserPosts;
