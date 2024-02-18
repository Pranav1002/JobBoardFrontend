import Image from "next/legacy/image";

const FooterApps2 = () => {
  return (
    <div className="widget-content">
      <div className="download-btns">
        <div className="text">Click and Get started in seconds</div>
        <a href="#">
          <Image
            width={210}
            height={60}
            src="/images/icons/apple-2.png"
            alt="icons"
          />
        </a>
        <a href="#">
          <Image
            width={210}
            height={60}
            src="/images/icons/google-2.png"
            alt="icons"
          />
        </a>
      </div>
    </div>
  );
};

export default FooterApps2;
