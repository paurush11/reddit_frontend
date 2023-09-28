import { FieldInputProps } from "formik";

import {
  GetCommentsQuery,
  MeQuery,
  MyPostsQuery,
  PostsQuery,
} from "../generated/output/graphql";

export interface ProfileLeftSideProps {
  allPosts: MyPostsQuery;
}
export interface PostsProps {
  postData?: PostsQuery["posts"]["Posts"];
  meData: MeQuery;

  myCommentData?: GetCommentsQuery;

  dataType: postDataType;
}
export interface postPaginationProps {
  variables: {
    limit: number;
    cursor: string;
  };
  setVariables: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      cursor: string;
    }>
  >;
}
export type postDataType = "allPostData" | "mySavedPostData" | "myCommentsData";

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
