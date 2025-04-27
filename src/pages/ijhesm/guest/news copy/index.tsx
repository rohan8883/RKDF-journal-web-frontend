import Page from "@/components/helmet-page";

export default function Contact() {
  return (
    <Page title="Contact" className="bg-gray-200">
      <div className="space-y-4 p-4 border-white rounded-md border">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p>Kathal More - Argora - Ranchi Rd, opp. Water Tank, Dhipatoli, Pundag, Ranchi, Jharkhand 834004</p>

        <div>
          <h2 className="text-xl font-semibold">Principal Contact</h2>
          <p>IJHESM (International Journal of Humanities Engineering, Science and Management)</p>
          <p>Publishing Body: RKDF University Ranchi</p>
          <p>Phone: <a href="tel:+917260801432" className="text-blue-600 underline">+91-7260801432</a></p>
          <p>Email: <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 underline">publications@rkdfuniversity.org</a></p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Support Contact</h2>
          <p>Editor IJHESM</p>
          <p>Phone: <a href="tel:+919308829235" className="text-blue-600 underline">+91-9308829235</a></p>
          <p>Email: <a href="mailto:publications@rkdfuniversity.org" className="text-blue-600 underline">publications@rkdfuniversity.org</a></p>
        </div>
      </div>
    </Page>
  );
}
