"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, likeBlog } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const title = formData.get("title") as string
  addBlog(content, author, title)
  revalidatePath("/blogs")
  redirect("/blogs")
}

export const likeOneBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))
  likeBlog(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}

export const filterByTitle = async (formData: FormData) => {
  const title = formData.get("title") as string
  redirect(`/blogs?title=${title}`)
}