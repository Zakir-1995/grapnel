import LogoImg from "../assets/logo.svg"
const Logo = () => {
  return (
    <div className="w-full sm:min-w-[150px]">
      <img className="lg:w-40  w-32 " src={LogoImg} alt="Logo" />
    </div>
  );
}

export default Logo