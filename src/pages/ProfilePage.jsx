// src/pages/ProfilePage.jsx
import { useState } from "react";
import BottomNav from "../components/BottomNav";

// data dummy profil
const MOCK_PROFILE = {
  name: "williams",
  progress: 43,
};

// data dummy catatan per tanggal (format tanggal: "YYYY-MM-DD")
const MOCK_NOTES = [
  {
    id: "n1",
    date: "2025-03-10",
    title: "Dosen: Dr. Nasruddin",
    note: "Revisi terkait teori penelitian dan buat diagram gambaran umum.",
  },
  {
    id: "n2",
    date: "2025-03-10",
    title: "Dosen: Dr. Nasruddin",
    note: "Periksa kembali landasan teori dan sesuaikan dengan hasil bimbingan.",
  },
  {
    id: "n3",
    date: "2025-03-15",
    title: "Bimbingan Rutin",
    note: "Update progres bab 3 dan diskusi rencana pengujian.",
  },
];

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Buat matriks kalender 6 minggu, lengkap dengan hari bulan sebelumnya & sesudahnya
function getCalendarMatrix(currentMonth) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const firstDayIndex = (firstOfMonth.getDay() + 6) % 7; // 0 = Monday

  // tanggal awal grid (Senin minggu pertama)
  const startDate = new Date(year, month, 1 - firstDayIndex);

  const weeks = [];
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + w * 7 + d
      );
      week.push({
        date,
        inCurrentMonth: date.getMonth() === month,
      });
    }
    weeks.push(week);
  }

  return weeks;
}

function ProfilePage() {
  // default ke 15 Maret 2025 biar mirip desain
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 15)); // 2 = March
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 15));

  const calendarWeeks = getCalendarMatrix(currentMonth);
  const selectedKey = formatDateKey(selectedDate);
  const notesForSelected = MOCK_NOTES.filter((n) => n.date === selectedKey);

  const readableSelectedDate = selectedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const handleSelectDay = (dateObj) => {
    setSelectedDate(dateObj);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* konten utama */}
      <main className="flex-1 pt-10 pb-24">
        <div className="w-full max-w-5xl mx-auto px-6">
          {/* avatar + nama */}
          <div className="flex flex-col items-center mb-8">
            <ProfileAvatar />
            <p className="mt-3 text-base font-semibold text-slate-800">
              {MOCK_PROFILE.name}
            </p>
          </div>

          {/* progress bar */}
          <div className="w-full bg-slate-200 h-7 rounded-full overflow-hidden mb-6">
            <div className="relative h-full flex items-center">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${MOCK_PROFILE.progress}%` }}
              />
              <div
                className="h-full bg-red-400"
                style={{
                  width: `${Math.max(0, 100 - MOCK_PROFILE.progress - 5)}%`,
                }}
              />
              <div className="flex-1 h-full bg-slate-200" />
              <span className="absolute left-4 text-[11px] font-semibold text-white">
                {MOCK_PROFILE.progress} %
              </span>
            </div>
          </div>

          {/* card kalender */}
          <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
            {/* header bulan */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="px-2 py-1 text-slate-500 hover:text-slate-800 text-lg"
              >
                &lt;
              </button>
              <p className="text-xl font-semibold text-slate-900">
                {MONTH_NAMES[currentMonth.getMonth()]}
              </p>
              <button
                type="button"
                onClick={handleNextMonth}
                className="px-2 py-1 text-slate-500 hover:text-slate-800 text-lg"
              >
                &gt;
              </button>
            </div>

            {/* header hari */}
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-500 mb-3 tracking-wide">
              {WEEK_DAYS.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* grid tanggal */}
            <div className="grid grid-cols-7 gap-y-2 text-sm">
              {calendarWeeks.map((week, wi) =>
                week.map(({ date, inCurrentMonth }, di) => {
                  const key = date.toISOString();
                  const isSelected = formatDateKey(date) === selectedKey;

                  const baseTextClass = inCurrentMonth
                    ? "text-slate-800"
                    : "text-slate-300";

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelectDay(date)}
                      className="flex items-center justify-center"
                    >
                      <span
                        className={[
                          "w-8 h-8 flex items-center justify-center rounded-full transition",
                          isSelected
                            ? "bg-blue-600 text-white"
                            : baseTextClass +
                              (inCurrentMonth
                                ? " hover:bg-slate-100"
                                : ""),
                        ].join(" ")}
                      >
                        {date.getDate()}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* garis abu-abu */}
          <div className="w-full flex justify-center mb-4">
            <div className="w-64 h-1.5 rounded-full bg-slate-200" />
          </div>

          {/* tombol Create (masih dummy) */}
          <div className="w-full mb-6">
            <button
              type="button"
              className="w-full bg-blue-500 text-white text-sm font-medium py-3 rounded-full shadow-sm hover:bg-blue-600 transition"
              onClick={() => {
                alert("Create diklik (frontend-only)");
              }}
            >
              Create
            </button>
          </div>

          {/* notes untuk tanggal terpilih */}
          <section className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm px-6 py-5">
            <p className="text-sm font-semibold text-slate-800 mb-4">
              {readableSelectedDate}
            </p>

            {notesForSelected.length === 0 ? (
              <p className="text-xs text-slate-400">
                Belum ada catatan untuk tanggal ini.
              </p>
            ) : (
              <div className="space-y-3">
                {notesForSelected.map((item) => (
                  <div
                    key={item.id}
                    className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-100"
                  >
                    <p className="text-xs font-semibold text-slate-800 mb-1">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-600 leading-snug">
                      <span className="font-semibold">Notes: </span>
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* bottom nav */}
      <BottomNav />
    </div>
  );
}

/** Avatar template default */
function ProfileAvatar() {
  return (
    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-slate-200 to-slate-100 shadow-md flex items-center justify-center">
      <div className="w-24 h-24 rounded-full bg-slate-300 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-12 h-12 text-white"
          fill="currentColor"
        >
          {/* kepala */}
          <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
          {/* badan */}
          <path d="M5 19a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1H5v-1Z" />
        </svg>
      </div>
    </div>
  );
}

export default ProfilePage;
