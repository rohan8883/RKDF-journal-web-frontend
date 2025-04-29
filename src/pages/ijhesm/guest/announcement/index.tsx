

import Page from '@/components/helmet-page'
import SideContent from '../sideContent'

export default function Announcement() {
  return (
    <Page title="Privacy">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
     <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
            Announcement
            </div>
             {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}