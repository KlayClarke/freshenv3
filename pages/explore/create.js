export default function SalonCreate() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center">
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="Name"
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="Type"
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="average_price"
          >
            Average Price ($)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            type={"number"}
            min={0}
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="Image Url"
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="street_address"
          >
            Street Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="Street Address"
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="City"
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="State"
          />
        </div>
        <div className="form-section">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="zip_code"
          >
            Zip Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500 focus:border-opacity-50"
            placeholder="Zip Code"
          />
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 border border-green-500 rounded w-full">
          Create
        </button>
        <p className="mt-4">
          Change your mind?{" "}
          <a href="/explore" className="text-blue-500">
            Cancel
          </a>{" "}
        </p>
      </form>
    </div>
  );
}
