import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from 'lucide-react';
import { useState, useContext } from "react";

import { createPost } from "@/utils/apiCalls";
import { AuthContext } from "@/layout/MainLayout";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (postContent) {
      console.log(postContent);
      try {
        setIsSubmitting(true)
        const response = await createPost(token, postContent);
        if(response.message){
          console.log(response.message)
        }
        navigate("/user-home")

        console.log("response", response);
      } catch (err: any) {
        setServerError(err.message)
        console.log("create post error:",serverError)
      } finally {
        setIsSubmitting(false)
      }
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="grid w-full gap-4">
        <TextareaAutosize
          minRows={4}
          maxLength={500}
          required
          autoFocus
          value={postContent}
          onChange={handleOnChange}
          placeholder="whats on your mind.."
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

export default CreatePost;
