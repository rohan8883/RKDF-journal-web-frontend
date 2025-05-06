
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Image } from '@/components/image';
export default function SideContent() {
  return (

    <div className="space-y-6">
      {/* University Logo */}
      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="relative w-40 h-20">
            <Image
              src="/logo-rkdf-new.png?height=160&width=160"
              alt="RKDF University Logo"
              width={160}
              // height={160}
              className="object-contain"
            />
          </div>
          <h3 className="text-center font-medium ">RKDF UNIVERSITY RANCHI</h3>
          <a
            href="https://www.rkdfuniversity.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:text-teal-800 mt-2"
          >
            University Website
          </a>
        </CardContent>
      </Card>


      {/* For Authors Section */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-medium text-gray-800">For Authors</h3>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <Link to="/Journal/submissions" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Submit Manuscript
            </Link>
            <Link to="/Journal/researchArea" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Research Area
            </Link>
            <Link to="/Journal/pubChange" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Article Processing Charge
            </Link>
            <Link to="#" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Author Guidelines
            </Link>
            <Link to="/Journal/announcement" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Announcements
            </Link>
            <Link to="/Journal/editorialTeam" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Editorial Board
            </Link>
            <Link to="/Journal/indexing" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              All Approval, Licence and Indexing
            </Link>
            <Link to="/Journal/allPolicy" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              All Policy
            </Link>
          </div>
        </CardContent>
      </Card>
      {/* Reviewer Section */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-medium text-gray-800">Reviewer Instruction</h3>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            <Link to="#" className="text-teal-600 hover:text-teal-800 border-b pb-2">
              Reviewer Guidelines
            </Link>
            <Link to="#" className="text-teal-600 hover:text-teal-800   pb-2">
              Reviewer Report
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Journal Certifications */}
      <Card>
        <CardHeader className="pb-2">
          <h3 className="text-xl font-medium text-gray-800">License</h3>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-24  relative">
                <Image
                  src="/l-4.png?height=80&width=80"
                  alt="Open Access"
                  width={80}
                  // height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center mt-1">Open-Access</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24  relative">
                <Image
                  src="/peer-review.jpg?height=80&width=80"
                  alt="Peer Reviewed"
                  width={80}
                  // height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center mt-1">Peer-reviewed and refereed Journal</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24  relative">
                <Image
                  src="/l-3.png?height=80&width=80"
                  alt="ISSN Approved"
                  width={80}
                  // height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center mt-1">ISSN Approved</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24  relative">
                <Image
                  src="/l-5.png?height=80&width=80"
                  alt="Creative Common"
                  width={80}
                  // height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center mt-1">Creative Common</span>
            </div>
            <div className="flex flex-col items-center col-span-2 mx-auto">
              <div className="w-24   relative">
                <Image
                  src="/DOI.png?height=80&width=100"
                  alt="DOI"
                  width={100}
                  // height={80}
                  className="object-contain"
                />
              </div>
              <span className="text-xs text-center ">DOI</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}