import React from "react";
import { Carousel, Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";

type Props = {
  children: any;
  responsive?: any;
  slidesToShow?: number;
};

export const BooksCarousel: React.FC<Props> = (props: Props) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    slidesToShow: props.slidesToShow || 6,
    responsive: props.responsive || [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Carousel arrows {...settings} className={styles.carousel} dots>
      {props.children}
    </Carousel>
  );
};

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow}`} style={style}>
      <Button shape="circle" onClick={onClick} icon={<RightOutlined />} />
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`${className} ${styles.arrow}`} style={style}>
      <Button shape="circle" onClick={onClick} icon={<LeftOutlined />} />
    </div>
  );
}
