/**
 * Home Page
 * Server component that fetches blogs and renders the HomeView.
 */

import HomeView from "@/components/home/HomeView";
import { apiFetch } from "@/lib/api";

export default async function HomePage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ search?: string; page?: string }>;
}>) {
  const { search = "", page } = await searchParams;
  const currentPage = Number.parseInt(page || "1") || 1;

  let blogs = [];
  let pagination = { total: 0, totalPages: 0 };

  try {
    // [API Call] Fetch all blogs with search and pagination support.
    const res = await apiFetch(`/blogs?search=${encodeURIComponent(search)}&page=${currentPage}`);
    blogs = res.data;
    pagination = res.pagination;
  } catch (err) {
    console.error("Fetch failed", err);
  }

  return (
    <HomeView
      blogs={blogs}
      search={search}
      pagination={pagination}
      currentPage={currentPage}
    />
  );
}
