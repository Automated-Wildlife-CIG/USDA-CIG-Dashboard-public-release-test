const MarkerLoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="mb-3">Waiting marker data to load...</h2>
      <div className="border-4 border-gray-200 border-l-blue-500 rounded-full h-10 w-10 animate-spin"></div>
    </div>
  );
};

export default MarkerLoadingPage;
