import type React from "react";
import { useParams } from "react-router-dom";
import "./Home.css";
import LandingType from "../utils/enums";
import ImageHolder from "./ImageHolder";

const Home: React.FC = () => {
  const { type } = useParams<{ type?: string }>();

  const handleRegisterClick = () => {
    switch (type ?? "") {
      case LandingType.FAN:
        window.location.href = process.env.REACT_APP_LANDING_FAN as string;
        break;
      case LandingType.FIND:
        window.location.href = process.env.REACT_APP_LANDING_FIND as string;
        break;
      case LandingType.FUNDING:
        window.location.href = process.env.REACT_APP_LANDING_FUNDING as string;
        break;
      case LandingType.T:
        window.location.href = process.env.REACT_APP_LANDING_T as string;
        break;
      default:
        window.location.href = process.env.REACT_APP_LANDING_DEFAULT as string;
    }
  };

  const getHeaderList = () => {
    switch (type) {
      case LandingType.FAN:
        return ["뜰 것 같은 초기디자이너를", "직접 발굴하세요!"];
      case LandingType.FIND:
        return ["당신이 원하던 '느낌'", "저희가 찾아드립니다."];
      case LandingType.FUNDING:
        return ["디자인 제품에만", "집중한 펀딩"];
      case LandingType.T:
        return ["온라인에 흩어져 있는", "반팔티 전부 모았어요."];
      default:
        return ["당신을 위한", "디자이너 커머스 NUTS"];
    }
  };

  const getDescription = () => {
    switch (type) {
      case LandingType.FAN:
        return "나만의 개성을 표현할 유니크한 제품 겟하기.";
      case LandingType.FIND:
        return "여기에 모든 디자이너 브랜드를 모아뒀습니다.";
      case LandingType.FUNDING:
        return "어디서도 보지 못한 희귀 제품을 찾아서";
      case LandingType.T:
        return "소량제작되는 희귀템들도 NUTS에서";
      default:
        return "궁금하다면";
    }
  };

  return (
    <div className="home-container">
      <div className="logo-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/logo.svg`}
          className="logo-img"
          alt="NUTS logo"
          loading="lazy"
        />
      </div>
      <div className="text-container">
        <h1 className="title">
          {getHeaderList().map((header, index) => (
            <div>
              {header} <br />
            </div>
          ))}
        </h1>
        <h2 className="description">{getDescription()}</h2>
        <button type="button" onClick={handleRegisterClick}>
          사전예약하기
        </button>
      </div>
      <div className="landing-img-list-container">
        {(Object.values(LandingType) as string[]).includes(type ?? "")
          ? [...Array(4)].map((_, index) => (
              <div className={`landing-img${index === 1 ? "-full" : ""}`}>
                <ImageHolder
                  src={`${process.env.PUBLIC_URL}/${type}_block${
                    index + 1
                  }.png`}
                  alt={`landing explanation ${index} for ${type}`}
                />
              </div>
            ))
          : null}
      </div>
      {(Object.values(LandingType) as string[]).includes(type ?? "") ? (
        <div className="text-container">
          <h2 className="description">취향 디자인을 찾아서, NUTS</h2>
          <button
            type="button"
            onClick={handleRegisterClick}
            style={{ margin: 0 }}
          >
            사전예약하기
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default Home;
