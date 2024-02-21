import PostList from '@/components/admin/lists/posts';

import { fetchAllPosts } from '@/db/queries/admin/posts';

export default function AdminPostsListpage() {
  return (
    <div className="relative">
      <div className="md:col-span-3 flex flex-col gap-4">
        <h1 className="mb-4 text-xl text-white">Manage posts</h1>        
        <PostList fetchData={fetchAllPosts} />
      </div>
    </div>
  );
}