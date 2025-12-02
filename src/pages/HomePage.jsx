// src/pages/HomePage.jsx
import BottomNav from "../components/BottomNav";

const defaultUpdates = [
  {
    id: 1,
    name: "christianss",
    message: "sudah selesai semhas!!! :)",
    time: "Posted in 1h ago",
    progress: 66,
  },
  {
    id: 2,
    name: "davib",
    message: "lagi ngerjain program dulucs :)",
    time: "Posted in 3h ago",
    progress: 43,
  },
  {
    id: 3,
    name: "jackson",
    message: "bentar lagi siap, doakan ya",
    time: "Posted in 3h ago",
    progress: 58,
  },
  {
    id: 4,
    name: "radit",
    message: "semangat untuk revisi!!!",
    time: "Posted in 4h ago",
    progress: 40,
  },
  {
    id: 5,
    name: "christianss",
    message: "sudah selesai sempro!!! :)",
    time: "Posted in 1h ago",
    progress: 33,
  },
];

function HomePage() {
  // progress tersimpan di localStorage, misal [20, 40, 80, ...]
  const storedProgress = JSON.parse(localStorage.getItem("progress") || "[]");

  const updates = defaultUpdates.map((item, index) => ({
    ...item,
    progress:
      typeof storedProgress[index] === "number"
        ? storedProgress[index]
        : item.progress,
  }));

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* konten utama */}
      <main className="flex-1 w-full pt-6 pb-24">
        <div className="w-full max-w-6xl mx-auto px-6">
          {/* search bar */}
          <div className="w-full mb-6">
            <div className="w-full bg-white rounded-full border border-slate-200 flex items-center gap-3 px-4 py-2 shadow-sm">
              <span className="text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="search"
                className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* title */}
          <h2 className="text-sm font-semibold text-slate-700 mb-3">
            Recently Update
          </h2>

          {/* list card */}
          <section className="space-y-4">
            {updates.map((item) => (
              <UpdateCard key={item.id} item={item} />
            ))}
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

function UpdateCard({ item }) {
  return (
    <article className="bg-white rounded-3xl border border-slate-200 shadow-sm px-5 py-4 flex flex-col gap-3">
      {/* header: avatar + text */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <div className="w-full h-full bg-cover bg-center bg-[url('https://via.placeholder.com/80x80')]" />
        </div>

        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold text-slate-800">
              {item.name}{" "}
            </span>
            <span className="text-slate-700">{item.message}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{item.time}</p>
        </div>
      </div>

      {/* progress bar biru–merah–abu */}
      <div className="mt-1">
        <div className="w-full h-7 rounded-full bg-slate-200 overflow-hidden flex items-center">
          {/* biru + label */}
          <div
            className="relative h-full flex items-center"
            style={{ width: `${item.progress}%` }}
          >
            <div className="absolute inset-0 bg-blue-500" />
            <span className="relative z-10 ml-3 text-[11px] font-semibold text-white">
              {item.progress} %
            </span>
          </div>

          {/* merah */}
          <div
            className="h-full bg-red-400"
            style={{ width: `${Math.max(0, 100 - item.progress - 5)}%` }}
          />

          {/* sisa abu */}
          <div className="flex-1 h-full bg-slate-200" />
        </div>
      </div>
    </article>
  );
}

export default HomePage;
