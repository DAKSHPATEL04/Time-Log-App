import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEntry, updateEntry } from "../redux/dataSlice";

const Form = ({ editId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    checked: false,
    startTime: "",
    endTime: "",
    dropdown: "",
    description: "",
  });

  useEffect(() => {
    if (editId) {
      const entry = JSON.parse(localStorage.getItem("crudData")).find(
        (item) => item.id === editId
      );
      setFormData(entry);
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateEntry(formData));
    } else {
      dispatch(addEntry({ ...formData, id: Date.now() }));
    }
    setFormData({
      id: "",
      checked: false,
      startTime: "",
      endTime: "",
      dropdown: "",
      description: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-blue-50 to-purple-100 shadow-lg rounded-2xl p-6 max-w-full"
    >
      <div className="flex flex-wrap items-center gap-6">
        {/* Checkbox */}
        <label className="flex items-center gap-2 text-sm font-medium text-blue-800 bg-blue-100 px-3 py-2 rounded-lg shadow-sm">
          <input
            type="checkbox"
            name="checked"
            checked={formData.checked}
            onChange={handleChange}
            className="accent-blue-600 w-4 h-4"
          />
          Active
        </label>

        {/* Start and End Time */}
        <div className="flex gap-2">
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="border border-pink-300 bg-pink-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="border border-yellow-300 bg-yellow-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          />
        </div>

        {/* Dropdown */}
        <select
          name="dropdown"
          value={formData.dropdown}
          onChange={handleChange}
          required
          className="border border-green-300 bg-green-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
        >
          <option value="">Select Type</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          rows={2}
          className="border border-purple-300 bg-purple-50 rounded-xl px-4 py-2 text-sm min-w-[250px] max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none shadow-sm"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white text-sm font-semibold px-6 py-2 rounded-xl shadow-md transition duration-300 self-end"
        >
          {editId ? "Update Entry" : "Add Entry"}
        </button>
      </div>
    </form>
  );
};

export default Form;
