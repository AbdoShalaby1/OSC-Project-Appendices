import React, { useState } from "react";
import {
  FaCheck,
  FaLink,
  FaSpinner,
  FaStar,
  FaTrashCan,
  FaTriangleExclamation,
} from "react-icons/fa6";
import scrapeUrl from "../Services/scrapeUrl";
import Swal from "sweetalert2";
import saveOnlineListing from "../Services/saveOnlineListing";
import { AxiosError } from "axios";

export default function AddListingAdmin() {
  // --- State Management ---
  const [url, setUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const [isOpenedPreviously, setIsOpenedPreviously] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [provider, setProvider] = useState("Hatla2ee");

  // Form Data State
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    color: "",
    mileage: "",
    description: "",
    images: [] as string[],
    transmission: "Automatic",
    bodyType: "Sedan",
    fuelType: "Gas",
    location: "",
    coverImage: "",
    source: ""
  });

  const sites: Record<string,string> = {
    Hatla2ee: "eg.hatla2ee.com"
  }

  // --- Handlers ---

  // 1. Validate URL as user types
  const handleUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputUrl = e.target.value;
    setUrl(inputUrl);
    setIsLoading(false);
    setIsScraped(false);

    const isValid = inputUrl.includes(sites[provider]);
    setIsValidUrl(isValid || inputUrl === "");
  };

  // 2. Scrape
  const handleFetch = async () => {
    if (!url.includes(sites[provider])) return;

    setIsLoading(true);
    setIsScraped(false);

    try 
    {
      const data = (await scrapeUrl(url, provider)).data;
      setFormData({...data, source: url});
      setIsLoading(false);
      setIsScraped(true);
      setIsOpenedPreviously(true);
    }
    catch (error)
    {
      const err = error as AxiosError;
      const errorMessage = typeof err.response?.data === 'string' 
    ? err.response.data 
    : "An unexpected error occurred";
      setIsLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    }

  };

  // 3. Handle Form Input Changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // eslint-disable-next-line prefer-const
    let { id, value } = e.target;
    // Map input IDs (e.g., "field_make") to state keys (e.g., "make")
    const key = id.replace("field_", "");
    if (key == "price" || key == "mileage")
    {
      const rawValue = value.replace(/[^0-9]/g, '');
      value = Number(rawValue).toLocaleString('en-US');
    }
    setFormData((prev) => ({ ...prev, [key]: (key == "price" || key == "mileage" ? value.replaceAll(",","") : value) }));
  };

  // 4. Reset Form
  const handleReset = () => {
    setIsScraped(false);
    setUrl("");
    setIsValidUrl(false);
    setIsOpenedPreviously(false);
    setFormData({
      make: "",
      model: "",
      year: "",
      price: "",
      color: "",
      mileage: "",
      description: "",
      images: [],
      transmission: "Automatic",
      bodyType: "Sedan",
      fuelType: "Gas",
      location: "",
      coverImage: "",
      source: ""
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Listing Saved! (Console logs data)");
    console.log("Submitting:", formData);
  };

  const handleCoverSelect = (imgUrl: string) => {
    setFormData((prev) => ({ ...prev, coverImage: imgUrl }));
  };

  const handleAddImageUrl = (e: React.SyntheticEvent) => {
    e.preventDefault(); // Prevent form submit if inside a form

    if (!tempImageUrl.trim()) return; // Don't add empty strings

    if (!formData.images.includes(tempImageUrl)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, tempImageUrl],
      }));
      setTempImageUrl(""); // Clear the input
    }
    setTempImageUrl("Image exists!");
  };

  const handleDeleteImage = (
    indexToDelete: number,
    e: React.SyntheticEvent
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setFormData((prev) => {
      const imageToDelete = prev.images[indexToDelete];
      const newImages = prev.images.filter((_, i) => i !== indexToDelete);

      let newCover = prev.coverImage;
      if (prev.coverImage === imageToDelete && newImages.length != 0) {
        newCover = newImages[0];
      }
      else if (newImages.length == 0)
      {
        newCover = "";
      }

      return { ...prev, images: newImages, coverImage: newCover };
    });
  };

  const saveListing = () => {
    saveOnlineListing(formData)
    Swal.fire("Success","Listing added successfully!","success");
    handleReset();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Car Listing
        </h1>
      </div>

      {/* Step 1: Import Source */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-[#171216] flex items-center">
          Import Source
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source Site
            </label>
            <select
              id="sourceSelect"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-gray-50"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
                    >
              <option value="Hatla2ee">Hatla2ee</option>
            </select>
          </div>

          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listing URL
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                id="urlInput"
                value={url}
                onChange={handleUrlChange}
                placeholder={`https://${sites[provider]}...`}
                className={`flex-1 border rounded-lg shadow-sm p-2.5 outline-none focus:ring-2 
                                    ${
                                      !isValidUrl && url !== ""
                                        ? "border-red-500 bg-red-50 focus:ring-red-200"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                                    }`}
              />

              <button
                onClick={handleFetch}
                disabled={!url.includes(sites[provider]) || isLoading || isScraped}
                className={`cursor-pointer w-full sm:w-auto justify-center px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 
        ${
          isScraped
            ? "bg-green-600 hover:bg-green-700 text-white" // Success: Green + White Text
            : "bg-yellow-400 hover:bg-yellow-500 text-[#171216] shadow-md hover:shadow-lg" // Default: Brand Yellow + Dark Text
        }
        disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? (
                  <>
                    Processing <FaSpinner className="animate-spin" />
                  </>
                ) : isScraped ? (
                  <>
                    Fetched <FaCheck />
                  </>
                ) : (
                  <>Fetch Data</>
                )}
              </button>
            </div>
            {!isValidUrl && url !== "" && (
              <p className="text-red-500 text-xs mt-1">
                URL must start with <strong>{sites[provider]}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="mt-6 text-center py-4 bg-blue-50 rounded-lg border border-blue-100 animate-pulse">
            <span className="text-sm text-blue-800 flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" /> Scraping data... This may take a moment.  
            </span>
          </div>
        )}
      </div>

      {/* Step 2: Review & Complete Form */}
      {isOpenedPreviously && !isLoading && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100 animate-fade-in-up"
        >
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h2 className="text-lg font-semibold mb-4 text-[#171216] flex items-center">
                Review & Upload
              </h2>
              <p className="text-sm text-gray-500">
                We found the following data. Please fill in the missing details.
              </p>
            </div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            {/* Make */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Make
              </label>
              <input
                type="text"
                id="field_make"
                value={formData.make}
                onChange={handleInputChange}
                readOnly
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
              />
            </div>
            {/* Model */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Model
              </label>
              <input
                type="text"
                id="field_model"
                value={formData.model}
                onChange={handleInputChange}
                readOnly
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
              />
            </div>
            {/* Year */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Year
              </label>
              <input
                type="number"
                id="field_year"
                value={formData.year}
                onChange={handleInputChange}
                readOnly
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
              />
            </div>
            {/* Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Price (EGP)
                {formData.price === "" && (
                  <span className="text-amber-600 text-xs font-bold flex items-center gap-1">
                    <FaTriangleExclamation /> Missing
                  </span>
                )}
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="field_price"
                value={Number(formData.price).toLocaleString("en-US")}
                onChange={handleInputChange}
                placeholder="e.g. 500000"
                required
                className={`text-sm rounded-lg block w-full p-2.5 border 
                                    ${
                                      formData.price === ""
                                        ? "bg-amber-50 border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                                        : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Color
                {formData.color === "" && (
                  <span className="text-amber-600 text-xs font-bold flex items-center gap-1">
                    <FaTriangleExclamation /> Missing
                  </span>
                )}
              </label>
              <input
                type="text"
                id="field_color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="e.g. Silver"
                required
                className={`text-sm rounded-lg block w-full p-2.5 border 
                                    ${
                                      formData.color === ""
                                        ? "bg-amber-50 border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                                        : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
              />
            </div>

            {/* Mileage */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Mileage (Km)
                {formData.mileage === "" && (
                  <span className="text-amber-600 text-xs font-bold flex items-center gap-1">
                    <FaTriangleExclamation /> Missing
                  </span>
                )}
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="field_mileage"
                value={Number(formData.mileage).toLocaleString("en-US")}
                onChange={handleInputChange}
                placeholder="e.g. 100"
                required
                className={`text-sm rounded-lg block w-full p-2.5 border 
                                    ${
                                      formData.mileage === ""
                                        ? "bg-amber-50 border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                                        : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Location
                {formData.location === "" && (
                  <span className="text-amber-600 text-xs font-bold flex items-center gap-1">
                    <FaTriangleExclamation /> Missing
                  </span>
                )}
              </label>
              <input
                type="text"
                id="field_location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Cairo"
                required
                className={`text-sm rounded-lg block w-full p-2.5 border 
                                    ${
                                      formData.location === ""
                                        ? "bg-amber-50 border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                                        : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    }`}
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Transmission (Verify if CVT or not)
              </label>
              <select
                id="field_transmission"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-gray-50"
                onChange={handleInputChange}
                value={
                  formData.transmission
                }
              >
                <option value="Manual">Manual</option>
                <option value="CVT">Automatic (CVT)</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Body Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Body Type
              </label>
              <select
                id="field_bodyType"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-gray-50"
                onChange={handleInputChange}
                value={
                  formData.bodyType
                }
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Pickup Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Minivan">Minivan</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 flex justify-between">
                Fuel Type
              </label>
              <select
                id="field_fuelType"
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border bg-gray-50"
                onChange={handleInputChange}
                value={
                  formData.fuelType
                }
              >
                <option value="Gas">Gas</option>
                <option value="Diesel">Diesel</option>
                <option value="Natural">Natural Gas</option>
                <option value="EV">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="field_description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-3 text-sm font-medium text-gray-900">
              Gallery
              <span className="text-gray-500 font-normal ml-1">
                (Click to select cover)
              </span>
            </label>

            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              id="imagePreviewContainer"
            >
              {/* --- 1. The "Add URL" Card --- */}
              <div className="flex flex-col items-center justify-center h-32 md:h-40 border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
                <div className="w-full space-y-2 text-center">
                  <span className="text-xs text-gray-500 font-medium flex gap-1">
                    <FaLink /> Add Image URL
                  </span>

                  <input
                    type="text"
                    value={tempImageUrl}
                    onChange={(e) => setTempImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full text-xs p-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 outline-none"
                    // Allow pressing "Enter" to add
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddImageUrl(e);
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    disabled={!tempImageUrl}
                    className="cursor-pointer w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    + Add Photo
                  </button>
                </div>
              </div>

              {/* --- 2. The Image List --- */}
              {formData.images.map((img, index) => {
                const isCover = formData.coverImage === img;

                return (
                  <label
                    key={index}
                    className={`relative cursor-pointer group rounded-lg overflow-hidden border-2 transition-all duration-200
            ${
              isCover
                ? "border-yellow-400 ring-2 ring-yellow-400 ring-offset-2"
                : "border-gray-200 hover:border-yellow-200"
            }`}
                  >
                    {/* Radio Input for Cover Selection */}
                    <input
                      type="radio"
                      name="coverImage"
                      value={img}
                      checked={isCover}
                      onChange={() => handleCoverSelect(img)}
                      className="sr-only"
                    />

                    {/* The Image */}
                    <img
                      src={img}
                      alt={`Car ${index}`}
                      className="w-full h-32 md:h-40 object-cover"
                    />

                    {/* Badge: Cover Image */}
                    {isCover && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                        <span className="flex gap-1 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          <FaStar /> Cover
                        </span>
                      </div>
                    )}

                    {/* Badge: Delete Button */}
                    <button
                      onClick={(e) => handleDeleteImage(index, e)}
                      className="absolute top-2 right-2 bg-white/90 text-red-500 hover:text-red-700 hover:bg-white rounded-full p-1.5 shadow-sm transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
                      title="Remove image"
                    >
                      <FaTrashCan className="text-sm w-4 h-4 flex items-center justify-center cursor-pointer" />
                    </button>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer text-gray-700 bg-white border border-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveListing}
              className="cursor-pointer w-full sm:w-auto justify-center px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#171216] shadow-md hover:shadow-lg"
            >
              Save Listing
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
