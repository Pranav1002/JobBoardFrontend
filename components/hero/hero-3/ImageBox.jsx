import Image from "next/legacy/image";

const ImageBox = () => {
  return (
    <div className="image-box">
      <figure className="main-image" data-aos-delay="1500" data-aos="fade-left">
        <Image
          width={885}
          height={576}
          src="/images/resource/banner-img-3.png"
          alt="banner-img"
        />
      </figure>
    </div>
  );
};

export default ImageBox;
