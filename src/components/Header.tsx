
const Header = () => {
  return (
    <header className="w-full bg-[#F8F8F8] flex flex-col items-center">
      <div className="flex justify-center items-center w-[92%] py-2 ">
        {/* <p>Toggle</p> */}
        <img src="logo-dark-transparent.png"
        className=" block w-[45%] md:w-[18%]" alt="Dynamic notes Logo"/>
        {/* <p>Search</p> */}
      </div>
    </header>
  )
}

export default Header
