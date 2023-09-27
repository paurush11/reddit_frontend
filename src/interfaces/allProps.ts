import { FieldInputProps } from "formik";

import {
  GetCommentsQuery,
  GetSavedPostsQuery,
  MeQuery,
  MyPostsQuery,
  MyVotedPostsQuery,
  PostsQuery,
} from "../generated/output/graphql";

export interface ProfileLeftSideProps {
  allPosts: MyPostsQuery;
}
export interface PostsProps {
  postData?: PostsQuery;
  meData: MeQuery;
  myPostData?: MyPostsQuery;
  myCommentData?: GetCommentsQuery;
  myVotedPostData?: MyVotedPostsQuery;
  mySavedPostData?: GetSavedPostsQuery;
}

export interface LayoutProps {
  variant?: variantWrapper;
  children: any;
}

export type InputFieldProps = Partial<FieldInputProps<any>> & {
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  textarea?: boolean;
};

export interface UpvoteSectionProps {
  post: PostsQuery["posts"]["Posts"][0];
}

export interface WrapperProps {
  children: any;
  variant: variantWrapper;
}

export type variantWrapper = "small" | "regular" | "Large";

export interface ProfileRightSideProps {
  meData: MeQuery;
}
