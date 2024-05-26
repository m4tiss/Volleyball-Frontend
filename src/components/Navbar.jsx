function NavBar() {
    return (
      <div className="flex bg-purple-700 h-20 text-white items-center justify justify-between">
        <div className="flex ml-10">
        <h2 className="text-3xl mx-10 select-none">VolleyWatch</h2>
        <h2 className="text-3xl mx-20 hover:text-yellow-400 border-none cursor-pointer">Wszystkie zespoły</h2>
        </div>

        <div className="flex mr-10">
          <button className="text-3xl bg-yellow-400 rounded-full p-3 text-purple-700">Login</button>
        </div>

      </div>
    );
  }
  
  export default NavBar;
  