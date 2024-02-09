import prismadb from "../lib/prismadb"

const DAY_IN_MILLIS = 60 * 60 * 24 * 1000

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export interface AddPostPayload {
  content: string
  authorId: string
}

interface Post extends AddPostPayload {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface AddCommentPayload {
  text: string
  postId: string
  commenterId: string
}

class PostService {
  public static async getAllPosts() {
    const posts = await prismadb.post.findMany({
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
            profileImageURL: true,
          },
        },
      },
    })

    return PostService.randomizePosts(posts)
  }

  private static randomizePosts(posts: Post[]) {
    let last24hPosts = posts.filter((post) => {
      const createdTime = Date.parse(post.createdAt.toString())
      const presentTime = Date.now()

      if (presentTime - createdTime <= DAY_IN_MILLIS) return post
    })
    last24hPosts = last24hPosts.sort(
      (aP: Post, bP: Post) =>
        Date.parse(bP.createdAt.toString()) -
        Date.parse(aP.createdAt.toString())
    )

    let prev5dayPosts = posts.filter((post) => {
      const createdTime = Date.parse(post.createdAt.toString())
      const presentTime = Date.now()

      if (
        presentTime - createdTime > DAY_IN_MILLIS &&
        presentTime - createdTime <= DAY_IN_MILLIS * 6
      )
        return post
    })
    prev5dayPosts = shuffle(prev5dayPosts)

    let oldPosts = posts.filter((post) => {
      const createdTime = Date.parse(post.createdAt.toString())
      const presentTime = Date.now()

      if (presentTime - createdTime > DAY_IN_MILLIS * 6) return post
    })
    oldPosts = oldPosts.sort(
      (aP: Post, bP: Post) =>
        Date.parse(bP.createdAt.toString()) -
        Date.parse(aP.createdAt.toString())
    )

    return [...last24hPosts, ...prev5dayPosts, ...oldPosts]
  }

  public static addPost(payload: AddPostPayload, id: string) {
    const { content } = payload

    return prismadb.post.create({
      data: {
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
