// app/blog/layout.jsx
export default function BlogLayout({ children }) {
  return (
    <div className="flex">
      <aside className="w-1/4 bg-gray-100 p-4">Blog Sidebar</aside>
      <div className="w-3/4 p-4">{children}</div>
    </div>
  );
}
