import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

type CreateCommentProps = {
  handleCreateComment: (comment: string) => void;
};

const CreateComment: React.FC<CreateCommentProps> = ({
  handleCreateComment,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (comment) {
      try {
        await handleCreateComment(comment);
        setComment("");
      } catch (error) {
        console.error("error posting comment: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <div>
      <form onSubmit={postComment} className="space-y-2">
        <TextareaAutosize
          minRows={2}
          maxLength={500}
          required
          value={comment}
          onChange={handleOnChange}
          placeholder="leave a comment..."
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          type="submit"
          size={"sm"}
          variant={"secondary"}
          className="w-fit place-self-end uppercase"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" />
              <span>posting...</span>
            </>
          ) : (
            <span> Post</span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateComment;
