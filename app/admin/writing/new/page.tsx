import PostForm from "../PostForm"
import { WRITING_CATEGORIES } from "@/lib/writing"

export default async function NewPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-8">New Post</h1>
      <PostForm categories={WRITING_CATEGORIES} />
    </div>
  )
}
