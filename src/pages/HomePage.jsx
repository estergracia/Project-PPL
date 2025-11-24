function HomePage() {
  const progress = JSON.parse(localStorage.getItem("progress") || "[]");

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Homepage</h1>

      <p className="text-xl mb-4">
        Progress kamu:{" "}
        <span className="font-semibold">{progress.join(", ")}</span>
      </p>
    </div>
  );
}

export default HomePage;
