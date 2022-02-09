function Header() {
  return (
    <div
      className="header"
      style={{ backgroundImage: "url('/images/header.jpg')" }}
    >
      <div className="logo-box">
        <div className="text-box">
          <div className="off-year-box">
            <span className="off">Off</span>
            <span className="year">Year</span>
          </div>
          <div className="westchester">Westchester County</div>
        </div>
        <img className="wch-image" src={`./images/wchWhite.png`} alt="" />
      </div>
    </div>
  );
}

export default Header;
