const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-48 w-48">
        <h2 className="mb-3">Loading...</h2>
        <div className="border-4 border-gray-200 border-l-blue-500 rounded-full h-10 w-10 animate-spin"></div>
      </div>
    </div>
  );
};
export default LoadingPage;
