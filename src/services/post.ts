import prismadb from "../lib/prismadb"

export interface AddPostPayload {
  title: string
  content: string
  authorId: string
}

export interface AddCommentPayload {
  text: string
  postId: string
  commenterId: string
}

class PostService {
  public static addPost(payload: AddPostPayload, id: string) {
    const { title, content } = payload

    return prismadb.post.create({
      data: {
        title,
        content,
        authorId: id,
      },
    })
  }

  public static addComment(payload: AddCommentPayload, id: string) {
    const { text, postId } = payload

    return prismadb.comment.create({
      data: {
        text,
        postId,
        commenterId: id,
      },
    })
  }
}

export default PostService
