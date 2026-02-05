import { prisma } from "@/lib/prisma"
import { markEnquiryRead } from "@/app/actions"
import { Mail, CheckCircle } from "lucide-react"

export default async function EnquiriesPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <h1 className="text-3xl font-serif text-thought mb-8">Enquiries</h1>
      
      <div className="space-y-4">
        {submissions.map((sub) => (
          <div key={sub.id} className={`p-6 border ${sub.read ? 'bg-gray-50 border-gray-200' : 'bg-white border-action/30'} shadow-sm`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-thought">{sub.subject}</h3>
                <div className="text-sm text-thought/60 flex items-center gap-2 mt-1">
                  <Mail size={14} />
                  <span>{sub.email}</span>
                  <span className="text-warmth">•</span>
                  <span>{sub.name}</span>
                  <span className="text-warmth">•</span>
                  <span>{new Date(sub.createdAt).toLocaleString()}</span>
                </div>
              </div>
              {!sub.read && (
                <form action={markEnquiryRead.bind(null, sub.id)}>
                  <button className="text-xs bg-action/10 text-action px-3 py-1 rounded hover:bg-action/20 transition-colors">
                    Mark as Read
                  </button>
                </form>
              )}
              {sub.read && <CheckCircle size={20} className="text-green-500/50" />}
            </div>
            <p className="text-thought/80 whitespace-pre-wrap">{sub.message}</p>
          </div>
        ))}
        
        {submissions.length === 0 && (
          <div className="p-12 text-center border border-dashed border-warmth/30 rounded">
            <p className="text-thought/60">No enquiries yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
