const DesktopRestrictionModal = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg max-w-md mx-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">
        Mobile-Only Application
      </h2>
      <p className="text-gray-600 mb-6">
        This application is optimized for mobile devices only. Please access it
        from your smartphone for the best experience.
      </p>
      <div className="text-center">
        <a
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Got it
        </a>
      </div>
    </div>
  </div>
);

export default DesktopRestrictionModal;
