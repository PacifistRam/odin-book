import PostOverview from "./ PostOverview";

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

const UserPosts = ({ postsData }: { postsData: UserPost }) => {
  return (
    <div>
        {
            postsData.posts.map(post => (
                <div key={post.id}>
                    <PostOverview post={post} />
                </div>
            ))
        }
    </div>
  )
}

export default UserPosts