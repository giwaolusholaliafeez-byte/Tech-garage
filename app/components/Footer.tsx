export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tech Garage
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              TechGarage — your go-to spot for quality gadgets at great prices. Reliable tech, smooth service, no stress.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">All Products</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">Featured</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">New Arrivals</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">Shipping Info</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">Returns</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition-colors">Newsletter</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>&copy; 2024 Tech Garage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

