import Link from "next/link"

export default function SharedFooter() {
  return (
    <footer className="bg-gradient-to-t from-gray-50 to-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-gray-600">
              Medical Frequency is the ultimate platform for healthcare professionals and medical enthusiasts.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/stream" className="text-sm text-gray-600 hover:text-primary">
                  Stream
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-gray-600 hover:text-primary">
                  News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Email: contact@medicalfrequency.com</li>
              <li className="text-sm text-gray-600">Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Medical Frequency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

