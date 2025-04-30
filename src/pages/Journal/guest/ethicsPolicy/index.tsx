

import Page from '@/components/helmet-page'
import SideContent from '../sideContent'
import { Scale, UserCheck, Users, FileText, BookOpen } from 'lucide-react'
export default function EthicsPolicy() {
  return (
    <Page title="Ethics Policy">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-teal-700 text-white py-8 shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Scale className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-center">Ethics and Malpractice Statement</h1>
            </div>
            <p className="text-center text-teal-100 max-w-3xl mx-auto">
              Our commitment to ethical publishing practices for all participants
            </p>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 on desktop */}


            <div className="lg:col-span-2 space-y-8">
              {/* Introduction Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <Scale className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Our Commitment</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6">
                  <p className="text-gray-700 leading-relaxed">
                    To maintain fair practice we at <span className="font-semibold text-teal-700">IJHESM</span> strongly believe in following ethical guidelines. We are committed to fair practice of publication. Success in this regard can be achieved if ethics are well practiced by the following participants:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-500">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <UserCheck className="h-4 w-4" /> Authors
                      </h3>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Editors
                      </h3>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" /> Reviewers
                      </h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                        <Users className="h-4 w-4" /> Publisher
                      </h3>
                    </div>
                  </div>
                </div>
              </section>

              {/* Authors Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <UserCheck className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Duties of Authors</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Reporting Standards</h3>
                    <p className="text-gray-700">
                      Authors of reports of original research should present an accurate account of the work performed as well as an objective discussion of its significance. Underlying data should be represented accurately in the paper. A paper should contain sufficient detail and references to permit others to replicate the work.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Originality and Plagiarism</h3>
                    <p className="text-gray-700">
                      The authors should ensure that they have written entirely original works, and if the authors have used the work and/or words of others that this has been appropriately cited or quoted. Plagiarism in all its forms constitutes unethical publishing behavior and is unacceptable.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Multiple Publication</h3>
                    <p className="text-gray-700">
                      An author should not publish manuscripts describing essentially the same research in more than one journal. Submitting the same manuscript to more than one journal concurrently constitutes unethical publishing behavior.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Authorship</h3>
                    <p className="text-gray-700">
                      Authorship should be limited to those who have made significant contributions. The corresponding author should ensure all co-authors have approved the final version and agreed to its submission.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Hazards and Human/Animal Subjects</h3>
                    <p className="text-gray-700">
                      If the work involves hazards or human/animal subjects, authors must clearly identify these and include statements about compliance with ethical standards and informed consent.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Disclosure and Conflicts</h3>
                    <p className="text-gray-700">
                      All authors should disclose any financial or other conflicts of interest that might influence results or interpretation. All funding sources should be disclosed.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Fundamental Errors</h3>
                    <p className="text-gray-700">
                      When an author discovers significant errors in published work, they must promptly notify the journal to retract or correct the paper.
                    </p>
                  </div>
                </div>
              </section>

              {/* Editors Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Duties of Editors</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Publication Decisions</h3>
                    <p className="text-gray-700">
                      Editors evaluate manuscripts based on academic merit, importance to researchers, and relevance to the journal's scope, while considering legal requirements regarding libel, copyright, and plagiarism.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Fair Play</h3>
                    <p className="text-gray-700">
                      Editors evaluate manuscripts without regard to race, gender, sexual orientation, religion, ethnicity, citizenship, or political philosophy of the authors.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Confidentiality</h3>
                    <p className="text-gray-700">
                      Editors and editorial staff must not disclose information about submitted manuscripts to anyone except the corresponding author, reviewers, and publisher as appropriate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Disclosure and Conflicts</h3>
                    <p className="text-gray-700">
                      Editors must not use unpublished information in their own research without the author's written consent. They should recuse themselves from decisions where conflicts of interest exist.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Investigation Cooperation</h3>
                    <p className="text-gray-700">
                      Editors should take responsive measures when ethical complaints are presented concerning submitted or published papers, including contacting authors and institutions as needed.
                    </p>
                  </div>
                </div>
              </section>

              {/* Reviewers Section */}
              <section className="transform transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-teal-600 to-teal-500 text-white p-5 rounded-t-lg flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  <h2 className="text-xl font-semibold">Duties of Reviewers</h2>
                </div>
                <div className="bg-white border-t-0 rounded-b-lg shadow-md p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contribution to Decisions</h3>
                    <p className="text-gray-700">
                      Peer review assists editors in making editorial decisions and helps authors improve their papers through editorial communications.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Promptness</h3>
                    <p className="text-gray-700">
                      Reviewers who feel unqualified to review a manuscript or cannot review promptly should notify the editors.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Confidentiality</h3>
                    <p className="text-gray-700">
                      Manuscripts received for review must be treated as confidential documents and not shown to or discussed with others without authorization.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Objectivity</h3>
                    <p className="text-gray-700">
                      Reviews should be conducted objectively, with clear supporting arguments. Personal criticism of authors is inappropriate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Source Acknowledgement</h3>
                    <p className="text-gray-700">
                      Reviewers should identify relevant uncited work and alert editors to any substantial similarity with other published papers.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Disclosure and Conflicts</h3>
                    <p className="text-gray-700">
                      Reviewers must not use unpublished materials without the author's consent and should not review manuscripts where conflicts of interest exist.
                    </p>
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




