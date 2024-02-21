const paths = {
  home() {
    return '/admin';
  },
  categories() {
    return '/admin/categories';
  },
  category(categoryId: string) {
    return `/admin/categories/${categoryId}`;
  },
  posts() {
    return '/admin/posts';
  },
  post(postId: string) {
    return `/admin/posts/${postId}`;
  },
  tags() {
    return '/admin/tags';
  },
  tag(tagId: string) {
    return `/admin/tags/${tagId}`;
  },
  users() {
    return '/admin/users';
  },
  user(userId: string) {
    return `/admin/users/${userId}`;
  },
  login() {
    return '/admin/auth/login';
  },
  register() {
    return `/admin/auth/register`;
  },
};

export default paths;
