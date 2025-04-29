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
  FlaskConical , 
  LineChart 
} from 'lucide-react'

export default function ResearchAreas() {
  const researchAreas = [
    { 
      title: "Mechanical Engineering", 
      icon: <Cpu className="h-8 w-8 text-red-500" />,
      color: "bg-red-50",
      borderColor: "border-red-200",
      iconBg: "bg-red-100"
    },
    { 
      title: "Electrical Engineering", 
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-200",
      iconBg: "bg-yellow-100"
    },
    { 
      title: "Civil Engineering", 
      icon: <Building2 className="h-8 w-8 text-blue-500" />,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100"
    },
    { 
      title: "Computer Science Engineering", 
      icon: <Laptop className="h-8 w-8 text-purple-500" />,
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100"
    },
    { 
      title: "Information Technology", 
      icon: <Globe className="h-8 w-8 text-green-500" />,
      color: "bg-green-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100"
    },
    { 
      title: "Electrical & Electronics Engineering", 
      icon: <CircuitBoard className="h-8 w-8 text-orange-500" />,
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-100"
    },
    { 
      title: "Arts", 
      icon: <BookOpen className="h-8 w-8 text-pink-500" />,
      color: "bg-pink-50",
      borderColor: "border-pink-200",
      iconBg: "bg-pink-100"
    },
    { 
      title: "Humanities", 
      icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
      color: "bg-indigo-50",
      borderColor: "border-indigo-200",
      iconBg: "bg-indigo-100"
    },
    { 
      title: "Science", 
      icon: <FlaskConical  className="h-8 w-8 text-cyan-500" />,
      color: "bg-cyan-50",
      borderColor: "border-cyan-200",
      iconBg: "bg-cyan-100"
    },
    { 
      title: "Management", 
      icon: <LineChart className="h-8 w-8 text-teal-500" />,
      color: "bg-teal-50",
      borderColor: "border-teal-200",
      iconBg: "bg-teal-100"
    }
  ];

  return (
    <Page title="Research Areas">
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-blue-500 transform transition-all hover:shadow-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Research Area in All Major Subjects</h1>
                
                {/* Area of Publication Heading */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <span className="bg-blue-100 p-2 rounded-full mr-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </span>
                    Area of Publication
                  </h2>
                </div>
                
                {/* Research Areas Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {researchAreas.map((area, index) => (
                    <div 
                      key={index}
                      className={`${area.color} rounded-lg border ${area.borderColor} p-6 flex flex-col items-center transform transition-all hover:scale-105 hover:shadow-md`}
                    >
                      <div className={`${area.iconBg} p-4 rounded-full mb-4`}>
                        {area.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 text-center">{area.title}</h3>
                    </div>
                  ))}
                </div>
                
                {/* Optional: Additional Info Section */}
                <div className="mt-10 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    IJHESM (International Journal of Humanities Engineering, Science and Management) welcomes high-quality research papers and contributions from the above disciplines.
                  </p>
                  <p className="text-gray-700">
                    Our journal aims to provide a platform for researchers, academicians, and industry professionals to share their innovative ideas, research findings, and expertise across these diverse fields.
                  </p>
                </div>
              </div>

              {/* Optional: Submit Research Section */}
              <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-md p-6 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold">Ready to Submit Your Research?</h3>
                    <p className="text-blue-100 mt-2">Contribute to our growing repository of knowledge</p>
                  </div>
                  <a 
                    href="/submissions" 
                    className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition shadow"
                  >
                    Submit Your Paper
                  </a>
                </div>
              </div>
            </div>
            
            {/* Sidebar - Takes 1/3 on desktop */}
            <SideContent />
          </div>
        </main>
      </div>
    </Page>
  )
}