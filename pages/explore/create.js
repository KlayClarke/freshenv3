import { useState, useEffect } from "react";

export default function SalonCreate() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    average_price: 0,
    image: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  async function handleCreate(e) {
    e.preventDefault();
    const {
      name,
      type,
      average_price,
      image,
      street_address,
      city,
      state,
      zip_code,
    } = formData;
    const res = await fetch(
      process.env.NEXT_PUBLIC_SITE_ENDPOINT + "/api/salons/create",
      {
        body: JSON.stringify({
          name,
          type,
          average_price,
          image,
          street_address,
          city,
          state,
          zip_code,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl text-green-500 font-semibold">Create</h1>
      <br />
      <form
        onSubmit={handleCreate}
        className="bg-white sm:shadow-sm sm:border sm:rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center"
      >
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
            name="name"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            value={formData.name}
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
            name="type"
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value });
            }}
            value={formData.type}
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
            type="number"
            name="average_price"
            min={0}
            onChange={(e) => {
              setFormData({ ...formData, average_price: e.target.value });
            }}
            value={formData.average_price}
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
            name="image"
            onChange={(e) => {
              setFormData({ ...formData, image: e.target.value });
            }}
            value={formData.image}
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
            name="street_address"
            onChange={(e) => {
              setFormData({ ...formData, street_address: e.target.value });
            }}
            value={formData.street_address}
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
            name="city"
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
            value={formData.city}
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
            name="state"
            onChange={(e) => {
              setFormData({ ...formData, state: e.target.value });
            }}
            value={formData.state}
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
            name="zip_code"
            onChange={(e) => {
              setFormData({ ...formData, zip_code: e.target.value });
            }}
            value={formData.zip_code}
          />
        </div>
        <button className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border border-green-500 w-full">
          Create
        </button>
        <p className="mt-4">
          <a href="/explore" className="text-green-500">
            Cancel
          </a>{" "}
        </p>
      </form>
    </div>
  );
}
