import React, { useState } from 'react';

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Form
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Form</h3>
              <form className="mt-2 was-validated" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="validationTextarea" className="block text-sm font-medium text-gray-700">Textarea</label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    id="validationTextarea"
                    placeholder="Required example textarea"
                    required
                  ></textarea>
                  <div className="invalid-feedback text-red-500 text-xs italic">
                    Please enter a message in the textarea.
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="validationFormCheck1" required />
                  <label className="form-check-label" htmlFor="validationFormCheck1">Check this checkbox</label>
                  <div className="invalid-feedback text-red-500 text-xs italic">Example invalid feedback text</div>
                </div>
                <div className="form-check">
                  <input type="radio" className="form-check-input" id="validationFormCheck2" name="radio-stacked" required />
                  <label className="form-check-label" htmlFor="validationFormCheck2">Toggle this radio</label>
                </div>
                <div className="form-check mb-3">
                  <input type="radio" className="form-check-input" id="validationFormCheck3" name="radio-stacked" required />
                  <label className="form-check-label" htmlFor="validationFormCheck3">Or toggle this other radio</label>
                  <div className="invalid-feedback text-red-500 text-xs italic">More example invalid feedback text</div>
                </div>
                <div className="mb-3">
                  <select className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required aria-label="select example">
                    <option value="">Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="invalid-feedback text-red-500 text-xs italic">Example invalid select feedback</div>
                </div>
                <div className="mb-3">
                  <input type="file" className="form-control" aria-label="file example" required />
                  <div className="invalid-feedback text-red-500 text-xs italic">Example invalid form file feedback</div>
                </div>
                <div className="mb-3">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                    Submit form
                  </button>
                </div>
              </form>
              <button
                onClick={togglePopup}
                className="mt-3 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;