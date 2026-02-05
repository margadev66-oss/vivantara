export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-warmth/20 shadow-sm">
          <h3 className="text-lg font-medium text-thought mb-2">Welcome Back</h3>
          <p className="text-thought/60">Select a module from the sidebar to manage your website content.</p>
        </div>
      </div>
    </div>
  )
}
