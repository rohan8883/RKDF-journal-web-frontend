import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { 
  Cpu, 
  Zap, 
  Building2, 
  Laptop, 
  Globe, 
  CircuitBoard, 
  BookOpen, 
  FlaskConical, 
  LineChart,
  BookMarked,
  ArrowRight
} from 'lucide-react'
import {Link} from 'react-router-dom'

export default function ResearchAreas() {
  const researchAreas = [
    { 
      title: "Mechanical Engineering", 
      icon: <Cpu className="h-6 w-6" />,
      color: "bg-red-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    { 
      title: "Electrical Engineering", 
      icon: <Zap className="h-6 w-6" />,
      color: "bg-amber-50",
      borderColor: "border-amber-200",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    { 
      title: "Civil Engineering", 
      icon: <Building2 className="h-6 w-6" />,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    { 
      title: "Computer Science Engineering", 
      icon: <Laptop className="h-6 w-6" />,
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    { 
      title: "Information Technology", 
      icon: <Globe className="h-6 w-6" />,
      color: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600"
    },
    { 
      title: "Electronics Engineering", 
      icon: <CircuitBoard className="h-6 w-6" />,
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    { 
      title: "Arts & Humanities", 
      icon: <BookOpen className="h-6 w-6" />,
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    { 
      title: "Science & Technology", 
      icon: <FlaskConical className="h-6 w-6" />,
      color: "bg-cyan-50",
      borderColor: "border-cyan-200",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600"
    },
    { 
      title: "Business Management", 
      icon: <LineChart className="h-6 w-6" />,
      color: "bg-teal-50",
      borderColor: "border-teal-200",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600"
    },
    { 
      title: "Interdisciplinary Studies", 
      icon: <BookMarked className="h-6 w-6" />,
      color: "bg-violet-50",
      borderColor: "border-violet-200",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600"
    }
  ];

  return (
    <Page title="Research Areas">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <BookMarked className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Research Areas</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Explore our multidisciplinary research domains and publication areas
            </p>
          </div>
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Research Areas Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <BookMarked className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Areas of Publication</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {researchAreas.map((area, index) => (
                      <div 
                        key={index}
                        className={`${area.color} ${area.borderColor} border rounded-lg p-5 hover:shadow-sm transition-all`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`${area.iconBg} ${area.iconColor} p-3 rounded-lg flex-shrink-0`}>
                            {area.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{area.title}</h3>
                            <Link 
                              to={`/submissions?area=${encodeURIComponent(area.title)}`}
                              className="mt-2 inline-flex items-center text-sm font-medium ${area.iconColor} hover:underline"
                            >
                              View papers <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Journal Scope Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Globe className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Journal Scope</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p>
                      <strong>IJHESM</strong> (International Journal of Humanities Engineering, Science and Management) welcomes high-quality research papers and contributions across all major disciplines in engineering, science, humanities, and management.
                    </p>
                    <p className="mt-4">
                      Our journal aims to provide a platform for researchers, academicians, and industry professionals to share innovative ideas, research findings, and expertise. We particularly encourage interdisciplinary research that bridges multiple domains.
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li>Peer-reviewed publications with rigorous standards</li>
                      <li>Open access to maximize research impact</li>
                      <li>International editorial board of domain experts</li>
                      <li>Indexed in major academic databases</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Call to Action */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-5 rounded-t-lg flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    Ready to Submit Your Research?
                  </h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Contribute to our growing knowledge base</h3>
                      <p className="text-gray-600 mt-1">Join researchers from around the world</p>
                    </div>
                    <Link
                      to="/submissions"
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-md"
                    >
                      Submit Your Paper <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </section>
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}