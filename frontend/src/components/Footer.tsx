import logo from "../assets/logo.png"
import qsafe from "../assets/qsafe.png"
import c9lab360 from "../assets/c9lab360.png"
import c9pharos from "../assets/c9pharos.png"
import c9phish from "../assets/c9phish.png"





const Footer = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto flex justify-between items-center">
      <img  src={qsafe} alt="C9Lab (Pinak Infosec Pvt. Ltd.)" height={120} width={120} />
      <img  src={c9lab360} alt="C9Lab (Pinak Infosec Pvt. Ltd.)" height={120} width={120} />
      <img  src={logo} alt="C9Lab (Pinak Infosec Pvt. Ltd.)" height={160} width={160} />
      <img  src={c9pharos} alt="C9Lab (Pinak Infosec Pvt. Ltd.)" height={120} width={120} />
      <img  src={c9phish} alt="C9Lab (Pinak Infosec Pvt. Ltd.)" height={120} width={120} />
      </div>
    </div>
  );
};

export default Footer;
