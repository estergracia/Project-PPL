import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputProgressPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([""]);

  // tambah input baru di bawah input pertama
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const updateInput = (value, index) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleNext = () => {
    const filtered = inputs.filter((i) => i.trim() !== "");
    if (filtered.length === 0) return;

    localStorage.setItem("progress", JSON.stringify(filtered));
    navigate("/home");
  };

  return (
    <div className="min-h-screen w-screen bg-white flex overflow-hidden">
      {/* LEFT IMAGE */}
      <div className="w-1/2 flex items-center justify-center">
        <img src="/s1.png" alt="students" className="w-[450px]" />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 bg-blue-300 px-20 py-24 flex flex-col">
        <h1 className="text-5xl font-bold text-black mb-16 flex items-center gap-2">
          Hallo, Angel 👋
        </h1>

        {/* FIRST INPUT WITH ADD BUTTON */}
        <div className="flex items-center gap-4 mb-10">
          <input
            type="text"
            placeholder="Your Progress"
            value={inputs[0]}
            onChange={(e) => updateInput(e.target.value, 0)}
            className="w-full bg-white rounded-xl px-5 py-4 border border-gray-300 text-black text-lg shadow"
          />

          <button
            onClick={addInput}
            className="bg-green-500 text-white px-5 py-4 rounded-xl text-2xl font-bold hover:bg-green-600 shadow"
          >
            +
          </button>
        </div>

        {/* INPUT TAMBAHAN */}
        <div className="space-y-4 mb-20 max-h-[250px] overflow-y-auto pr-2 custom-scroll">
          {inputs.slice(1).map((value, index) => (
            <input
              key={index + 1}
              type="text"
              placeholder="Your Progress"
              value={value}
              onChange={(e) => updateInput(e.target.value, index + 1)}
              className="w-full bg-white rounded-xl px-5 py-4 border border-gray-300 text-black text-lg shadow"
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-blue-900 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-950 shadow-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default InputProgressPage;
