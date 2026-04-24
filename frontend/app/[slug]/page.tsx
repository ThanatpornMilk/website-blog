/**
 * Blog Detail Page
 * Fetches specific blog data and renders it via BlogDetailView.
 */

import BlogDetailView from "@/components/blog/BlogDetailView";
import { apiFetch } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  try {
    // [API Call] Fetch blog data using the provided Slug.
    const blog = await apiFetch(`/blogs/${slug}`);
    return <BlogDetailView blog={blog} slug={slug} />;
  } catch {
    notFound();
  }
}
