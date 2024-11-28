import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { postTimestamp } from "@/utils/dateFunctions";

type CommentsData = {
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
} | null;
type DisplayCommentsProps = {
  commentsData: CommentsData
}

const DisplayComments: React.FC<DisplayCommentsProps> = ({commentsData}) => {
  return (
    <>
    <h2>User Comments:</h2>
    {
      commentsData?.comments.length ?
      commentsData.comments.map(comment => (
        <div key={comment.id} className="grid gap-2 px-2 py-4 rounded-xl shadow-sm mb-2 md:mb-3  transition-colors border-b " >
          <div className="flex items-center gap-2 text-sm">
             <Avatar className="h-7 w-7">
              <AvatarImage
                src={comment.commenter.profile.profilePic}
                alt="profile pic"
              />
              <AvatarFallback className="capitalize">
                {comment.commenter.userName.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <span>@{comment.commenter.userName}</span>
            <span className="font-light text-sm opacity-50">
                commented {postTimestamp(comment.createdAt)}
              </span>
          </div>
          <p>{comment.text}</p>
        </div>
      )) : (
        <div> No comments found</div>
      )
    } 
    </>
  )
}

export default DisplayComments