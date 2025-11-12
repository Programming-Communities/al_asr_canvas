import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Policy - Al-Asr Canvas',
  description: 'Learn about how we use cookies and manage your preferences',
};

export default function CookiesPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Cookies Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Understanding Cookies</h2>
            <p className="text-gray-700 mb-4">
              When you visit our website, it may store or retrieve information on your browser, 
              mostly in the form of cookies. This information might be about you, your preferences, 
              or your device and is primarily used to make the site work as you expect it to.
            </p>
            <p className="text-gray-700">
              The information does not usually directly identify you, but it can give you a more 
              personalized web experience. Because we respect your right to privacy, you can choose 
              not to allow some types of cookies.
            </p>
          </section>

          {/* Cookie Preferences */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Manage Your Cookie Preferences</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-700">
                <strong>Your Opt Out Preference Signal is Honored</strong>
              </p>
            </div>

            {/* Cookie Categories */}
            <div className="space-y-6">
              {/* Strictly Necessary Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Strictly Necessary Cookies</h3>
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded mt-2">
                      Always Active
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  These cookies are necessary for the website to function and cannot be switched off 
                  in our systems. They are usually only set in response to actions made by you which 
                  amount to a request for services, such as setting your privacy preferences, logging 
                  in or filling in forms.
                </p>
                <p className="text-gray-600 text-sm">
                  You can set your browser to block or alert you about these cookies, but some parts 
                  of the site will not then work. These cookies do not store any personally identifiable 
                  information.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Functional Cookies</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Allow
                  </button>
                </div>
                <p className="text-gray-700 mb-4">
                  These cookies enable the website to provide enhanced functionality and personalisation. 
                  They may be set by us or by third party providers whose services we have added to our pages.
                </p>
                <p className="text-gray-600 text-sm">
                  If you do not allow these cookies then some or all of these services may not function properly.
                </p>
              </div>

              {/* Performance Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Performance Cookies</h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                    Allow
                  </button>
                </div>
                <p className="text-gray-700 mb-4">
                  These cookies allow us to count visits and traffic sources so we can measure and 
                  improve the performance of our site. They help us to know which pages are the most 
                  and least popular and see how visitors move around the site.
                </p>
                <p className="text-gray-600 text-sm">
                  All information these cookies collect is aggregated and therefore anonymous. If you 
                  do not allow these cookies we will not know when you have visited our site, and will 
                  not be able to monitor its performance.
                </p>
              </div>

              {/* Targeting Cookies */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Targeting Cookies</h3>
                  <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors">
                    Block
                  </button>
                </div>
                <p className="text-gray-700 mb-4">
                  These cookies may be set through our site by our advertising partners. They may be 
                  used by those companies to build a profile of your interests and show you relevant 
                  adverts on other sites.
                </p>
                <p className="text-gray-600 text-sm">
                  They do not store directly personal information, but are based on uniquely identifying 
                  your browser and internet device. If you do not allow these cookies, you will experience 
                  less targeted advertising.
                </p>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Allow All Cookies
            </button>
            <button className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold">
              Reject All
            </button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Confirm My Choices
            </button>
          </div>

          {/* Additional Information */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Additional Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Manage Cookies</h3>
                <p className="text-gray-700">
                  You can manage your cookie preferences through your browser settings. Most browsers 
                  allow you to refuse cookies or delete existing ones.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Us</h3>
                <p className="text-gray-700">
                  If you have any questions about our Cookies Policy, please contact us through 
                  our contact page.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}