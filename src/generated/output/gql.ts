/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment RegularUser on User {\n  _id\n  createdAt\n  updatedAt\n  username\n}":
    types.RegularUserFragmentDoc,
  "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}":
    types.ChangePasswordDocument,
  "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    _id\n    creatorId\n    createdAt\n    updatedAt\n    title\n    text\n    points\n  }\n}":
    types.CreatePostDocument,
  "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}":
    types.DeletePostDocument,
  "mutation ForgotPassword($userNameOrEmail: String!) {\n  forgotPassword(UserNameOrEmail: $userNameOrEmail)\n}":
    types.ForgotPasswordDocument,
  "mutation Login($password: String!, $UserNameOrEmail: String!) {\n  login(password: $password, UserNameOrEmail: $UserNameOrEmail) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}":
    types.LoginDocument,
  "mutation Logout {\n  logout\n}": types.LogoutDocument,
  "mutation Register($options: UserNameOrEmailPassword!) {\n  register(options: $options) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.RegisterDocument,
  "mutation SavePost($postId: Int!) {\n  savePost(postId: $postId)\n}":
    types.SavePostDocument,
  "mutation UpdatePost($updatePostId: Int!, $text: String, $title: String) {\n  updatePost(id: $updatePostId, Text: $text, Title: $title) {\n    _id\n    creatorId\n    createdAt\n    updatedAt\n    title\n    text\n  }\n}":
    types.UpdatePostDocument,
  "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId)\n}":
    types.VoteDocument,
  "query GetComments {\n  getComments {\n    description\n    creator {\n      email\n      _id\n      username\n    }\n    post {\n      text\n      _id\n      points\n      title\n      creator {\n        username\n        _id\n      }\n    }\n    creatorId\n    createdAt\n    _id\n    updatedAt\n    postId\n  }\n}":
    types.GetCommentsDocument,
  "query GetSavedPosts($limit: Float!, $cursor: String) {\n  getSavedPosts(limit: $limit, cursor: $cursor) {\n    hasMore\n    Posts {\n      _id\n      creatorId\n      creator {\n        username\n      }\n      comments {\n        description\n        creator {\n          username\n        }\n      }\n      voteStatus\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      savedBy\n    }\n  }\n}":
    types.GetSavedPostsDocument,
  "query Me {\n  Me {\n    _id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n}":
    types.MeDocument,
  "query MyVotedPosts {\n  MyVotedPosts {\n    _id\n    creatorId\n    voteStatus\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    creator {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}":
    types.MyVotedPostsDocument,
  "query MyPosts($limit: Float!, $cursor: String) {\n  myPosts(limit: $limit, cursor: $cursor) {\n    Posts {\n      _id\n      creatorId\n      creator {\n        _id\n        createdAt\n        updatedAt\n        username\n        email\n      }\n      createdAt\n      updatedAt\n      title\n      text\n      points\n    }\n    hasMore\n  }\n}":
    types.MyPostsDocument,
  "query Post($identifier: Int!) {\n  post(identifier: $identifier) {\n    _id\n    creatorId\n    creator {\n      username\n      email\n      createdAt\n      _id\n    }\n    comments {\n      description\n      createdAt\n      creator {\n        username\n      }\n      _id\n      hasReplies\n    }\n    voteStatus\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    savedBy\n    hiddenBy\n  }\n}":
    types.PostDocument,
  "query Posts($limit: Float!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    Posts {\n      _id\n      creatorId\n      creator {\n        username\n        _id\n        email\n        createdAt\n      }\n      comments {\n        description\n        creator {\n          username\n        }\n        _id\n        hasReplies\n        createdAt\n      }\n      voteStatus\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      savedBy\n      hiddenBy\n    }\n  }\n}":
    types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment RegularUser on User {\n  _id\n  createdAt\n  updatedAt\n  username\n}",
): (typeof documents)["fragment RegularUser on User {\n  _id\n  createdAt\n  updatedAt\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}",
): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    _id\n    creatorId\n    createdAt\n    updatedAt\n    title\n    text\n    points\n  }\n}",
): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    _id\n    creatorId\n    createdAt\n    updatedAt\n    title\n    text\n    points\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}",
): (typeof documents)["mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ForgotPassword($userNameOrEmail: String!) {\n  forgotPassword(UserNameOrEmail: $userNameOrEmail)\n}",
): (typeof documents)["mutation ForgotPassword($userNameOrEmail: String!) {\n  forgotPassword(UserNameOrEmail: $userNameOrEmail)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Login($password: String!, $UserNameOrEmail: String!) {\n  login(password: $password, UserNameOrEmail: $UserNameOrEmail) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}",
): (typeof documents)["mutation Login($password: String!, $UserNameOrEmail: String!) {\n  login(password: $password, UserNameOrEmail: $UserNameOrEmail) {\n    errors {\n      field\n      message\n    }\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Logout {\n  logout\n}",
): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Register($options: UserNameOrEmailPassword!) {\n  register(options: $options) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n    errors {\n      field\n      message\n    }\n  }\n}",
): (typeof documents)["mutation Register($options: UserNameOrEmailPassword!) {\n  register(options: $options) {\n    user {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation SavePost($postId: Int!) {\n  savePost(postId: $postId)\n}",
): (typeof documents)["mutation SavePost($postId: Int!) {\n  savePost(postId: $postId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation UpdatePost($updatePostId: Int!, $text: String, $title: String) {\n  updatePost(id: $updatePostId, Text: $text, Title: $title) {\n    _id\n    creatorId\n    createdAt\n    updatedAt\n    title\n    text\n  }\n}",
): (typeof documents)["mutation UpdatePost($updatePostId: Int!, $text: String, $title: String) {\n  updatePost(id: $updatePostId, Text: $text, Title: $title) {\n    _id\n    creatorId\n    createdAt\n    updatedAt\n    title\n    text\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId)\n}",
): (typeof documents)["mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetComments {\n  getComments {\n    description\n    creator {\n      email\n      _id\n      username\n    }\n    post {\n      text\n      _id\n      points\n      title\n      creator {\n        username\n        _id\n      }\n    }\n    creatorId\n    createdAt\n    _id\n    updatedAt\n    postId\n  }\n}",
): (typeof documents)["query GetComments {\n  getComments {\n    description\n    creator {\n      email\n      _id\n      username\n    }\n    post {\n      text\n      _id\n      points\n      title\n      creator {\n        username\n        _id\n      }\n    }\n    creatorId\n    createdAt\n    _id\n    updatedAt\n    postId\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetSavedPosts($limit: Float!, $cursor: String) {\n  getSavedPosts(limit: $limit, cursor: $cursor) {\n    hasMore\n    Posts {\n      _id\n      creatorId\n      creator {\n        username\n      }\n      comments {\n        description\n        creator {\n          username\n        }\n      }\n      voteStatus\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      savedBy\n    }\n  }\n}",
): (typeof documents)["query GetSavedPosts($limit: Float!, $cursor: String) {\n  getSavedPosts(limit: $limit, cursor: $cursor) {\n    hasMore\n    Posts {\n      _id\n      creatorId\n      creator {\n        username\n      }\n      comments {\n        description\n        creator {\n          username\n        }\n      }\n      voteStatus\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      savedBy\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Me {\n  Me {\n    _id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n}",
): (typeof documents)["query Me {\n  Me {\n    _id\n    createdAt\n    updatedAt\n    username\n    email\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query MyVotedPosts {\n  MyVotedPosts {\n    _id\n    creatorId\n    voteStatus\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    creator {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}",
): (typeof documents)["query MyVotedPosts {\n  MyVotedPosts {\n    _id\n    creatorId\n    voteStatus\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    creator {\n      _id\n      createdAt\n      updatedAt\n      username\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query MyPosts($limit: Float!, $cursor: String) {\n  myPosts(limit: $limit, cursor: $cursor) {\n    Posts {\n      _id\n      creatorId\n      creator {\n        _id\n        createdAt\n        updatedAt\n        username\n        email\n      }\n      createdAt\n      updatedAt\n      title\n      text\n      points\n    }\n    hasMore\n  }\n}",
): (typeof documents)["query MyPosts($limit: Float!, $cursor: String) {\n  myPosts(limit: $limit, cursor: $cursor) {\n    Posts {\n      _id\n      creatorId\n      creator {\n        _id\n        createdAt\n        updatedAt\n        username\n        email\n      }\n      createdAt\n      updatedAt\n      title\n      text\n      points\n    }\n    hasMore\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Post($identifier: Int!) {\n  post(identifier: $identifier) {\n    _id\n    creatorId\n    creator {\n      username\n      email\n      createdAt\n      _id\n    }\n    comments {\n      description\n      createdAt\n      creator {\n        username\n      }\n      _id\n      hasReplies\n    }\n    voteStatus\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    savedBy\n    hiddenBy\n  }\n}",
): (typeof documents)["query Post($identifier: Int!) {\n  post(identifier: $identifier) {\n    _id\n    creatorId\n    creator {\n      username\n      email\n      createdAt\n      _id\n    }\n    comments {\n      description\n      createdAt\n      creator {\n        username\n      }\n      _id\n      hasReplies\n    }\n    voteStatus\n    createdAt\n    updatedAt\n    title\n    text\n    points\n    savedBy\n    hiddenBy\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Posts($limit: Float!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    Posts {\n      _id\n      creatorId\n      creator {\n        username\n        _id\n        email\n        createdAt\n      }\n      comments {\n        description\n        creator {\n          username\n        }\n        _id\n        hasReplies\n        createdAt\n      }\n      voteStatus\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      savedBy\n      hiddenBy\n    }\n  }\n}",
): (typeof documents)["query Posts($limit: Float!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    Posts {\n      _id\n      creatorId\n      creator {\n        username\n        _id\n        email\n        createdAt\n      }\n      comments {\n        description\n        creator {\n          username\n        }\n        _id\n        hasReplies\n        createdAt\n      }\n      voteStatus\n      createdAt\n      updatedAt\n      title\n      text\n      points\n      savedBy\n      hiddenBy\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
