import type React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();

  const handleRegisterClick = () => {
    navigate(`/register${type ? `?type=${type}` : ""}`);
  };

  return (
    <div className="home-container">
      <img
        src={`${process.env.PUBLIC_URL}/logo.svg`}
        alt="Logo"
        className="logo"
      />
      <div className="description">
        안녕하세요
        <br /> 당신을 위한 디자이너 제품 커머스 NUTS <br />
        궁금하다면
      </div>
      <button
        type="button"
        className="bt_register"
        onClick={handleRegisterClick}
      >
        등록하기
      </button>
    </div>
  );
};

export default Home;
