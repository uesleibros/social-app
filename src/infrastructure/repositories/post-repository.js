import prisma from "@/db.js";
import Post from "@/domain/entities/post/post";

export default class PostRepository {
  async create(post) {
    const newPost = await prisma.post.create({
      data: {
        content: post.content,
        nsfw: post.nsfw,
        authorId: post.authorId,
        attachments: post.attachments
      }
    });

    return new Post(newPost);
  }
  
  async findById(postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: true, 
        likes: true, 
        reposts: true, 
        comments: {
          include: {
            author: true,
            post: true,
            parent: true,
            replies: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        }
      },
    });

    return post ? new Post(post).toJSON() : null;
  }

  async delete(postId) {
    await prisma.post.delete({
      where: { id: postId },
    });
  }

  async findAll() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        likes: true, 
        reposts: true, 
        comments: {
          include: {
            author: true,
            post: true,
            parent: true,
            replies: true
          },
          orderBy: {
            createdAt: "desc", 
          },
        }
      },
      orderBy: {
        createdAt: "desc", 
      },
    });

    return posts.map(post => new Post(post).toJSON());
  }
}
