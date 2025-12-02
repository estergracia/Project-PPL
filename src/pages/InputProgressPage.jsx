// src/pages/InputProgressPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function InputProgressPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([""]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // tambah input baru di bawah input pertama
  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const updateInput = (value, index) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleNext = async () => {
    setError("");

    const filtered = inputs.filter((i) => i.trim() !== "");
    if (filtered.length === 0) {
      setError("Minimal isi satu progress dulu ya 🙂");
      return;
    }

    // simpan ke localStorage (dipakai di LoginPage)
    localStorage.setItem("progress", JSON.stringify(filtered));

    const user = auth.currentUser;
    if (!user) {
      // kalau entah kenapa user belum login, balikin ke login
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      // simpan progress ke Firestore di dokumen users/{uid}
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          progress: filtered,
          email: user.email ?? null,
        },
        { merge: true }
      );

      navigate("/home");
    } catch (err) {
      console.error("Gagal menyimpan progress:", err);
      setError("Gagal menyimpan ke database. Coba lagi nanti.");
    } finally {
      setSaving(false);
    }
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
        <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2 custom-scroll">
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

        {/* error message */}
        {error && (
          <p className="text-sm text-red-700 bg-red-100 rounded-lg px-4 py-2 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleNext}
          disabled={saving}
          className="w-full bg-blue-900 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-950 shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Next"}
        </button>
      </div>
    </div>
  );
}

export default InputProgressPage;
