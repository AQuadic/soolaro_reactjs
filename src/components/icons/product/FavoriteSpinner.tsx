const FavoriteSpinner = () => (
  <div className="w-5 h-5 relative">
    <div className="absolute inset-0 rounded-full border-2 border-[#018884]/20" />
    <div className="absolute inset-0 rounded-full border-2 border-[#018884] border-t-transparent animate-spin" />
  </div>
);

export default FavoriteSpinner;
