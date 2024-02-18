import Image from "next/legacy/image";

const ImageBox = () => {
  return (
    <div className="image-box -type-1">
      <figure className="main-image" data-aos="fade-in" data-aos-delay="500">
        <Image
          width={608}
          height={599}
          src="/images/index-14/images/1.png"
          alt="image"
        />
      </figure>

      <div className="info_block" data-aos="fade-in" data-aos-delay="700">
        <span className="icon flaticon-email-3"></span>
        <p>
          Work Inquiry From <br />
          Ali Tufan
        </p>
      </div>
      {/* <!-- Info BLock One --> */}

      <div className="info_block_two" data-aos="fade-in" data-aos-delay="900">
        <p>10k+ Candidates</p>
        <div className="image">
          <Image
            width={206}
            height={53}
            src="/images/resource/multi-peoples.png"
            alt="multi-peoples"
          />
        </div>
      </div>
      {/* <!-- Info BLock Two --> */}

      <div className="info_block_four" data-aos="fade-in" data-aos-delay="1100">
        <span className="icon flaticon-file"></span>
        <div className="inner">
          <p>Upload Your CV</p>
          <span className="sub-text">It only takes a few seconds</span>
        </div>
      </div>
      {/* <!-- Info BLock Four --> */}
    </div>
  );
};

export default ImageBox;
