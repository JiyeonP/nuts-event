import type React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [type, setType] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");
  const [suggestionsError, setSuggestionsError] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const typeParam = query.get("type");
    if (typeParam) {
      setType(typeParam);
    }
  }, [location]);

  const handleContactChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setContact(value);
      setContactError("");
    } else {
      setContactError("20자 이내로 작성해주세요");
    }
  };

  const handleSuggestionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setSuggestions(value);
      setSuggestionsError("");
    } else {
      setSuggestionsError("200자 이내로 작성해주세요");
    }
  };

  const chooseSuggestionPlaceholder = () => {
    switch (type) {
      case "1":
        return "이런 방식의 디자이너 덕질이 하고싶어요!";
      case "2":
        return "내 취향 저격하는 디자이너 제품을 어떻게 찾고 계신가요? 불편함은 없으신가요?";
      case "3":
        return "선호하는 디자이너 펀딩 가격대가 있나요? 어떤 디자이너의 제품이 갖고 싶으신가요?";
      case "4":
        return "nuts팀은 숨겨진 예쁜 티셔츠를 모아 여러분의 취향 티셔츠를 찾기 쉽게 도와드리려고 해요. 좋아하는 티셔츠 종류나 나만 아는 티셔츠 브랜드가 있나요?";
      default:
        return "nuts팀은 디자인을 통한 취향 발견을 도우려고 하고 있어요. 저희 팀의 아이디어에 대한 의견이나 제안이 있다면 자유롭게 알려주세요!";
    }
  };

  const handleSubmit = async () => {
    try {
      const form_url = process.env.REACT_APP_GOOGLE_FORM_URL as string;
      const contact_entry = process.env.REACT_APP_CONTACT_ENTRY as string;
      const suggestions_entry = process.env
        .REACT_APP_SUGGESTIONS_ENTRY as string;
      const type_entry = process.env.REACT_APP_TYPE_ENTRY as string;
      const fullUrl = `${form_url}${
        contact ? `&entry.${contact_entry}=${encodeURIComponent(contact)}` : ""
      }${
        suggestions
          ? `&entry.${suggestions_entry}=${encodeURIComponent(suggestions)}`
          : ""
      }${
        ["1", "2", "3", "4"].includes(type)
          ? `&entry.${type_entry}=${type}`
          : `&entry.${type_entry}=0`
      }`;
      await axios.get(fullUrl);
      navigate(`/${type}`);
    } catch (error) {
      navigate(`/${type}`);
    }
  };

  return (
    <div className="register-container">
      <h1 className="text-center">등록 페이지</h1>
      <div>
        <div>Contact</div>
        <textarea
          placeholder="이메일 혹은 전화번호"
          value={contact}
          onChange={handleContactChange}
          style={{ height: "16px", resize: "none" }}
        />
        {contactError && (
          <div style={{ color: "red", fontSize: "12px" }}>{contactError}</div>
        )}
      </div>
      <div>
        <div>Suggestions</div>
        <textarea
          placeholder={chooseSuggestionPlaceholder()}
          value={suggestions}
          onChange={handleSuggestionsChange}
          style={{ height: "100px", resize: "none" }}
        />
        {suggestionsError && (
          <div style={{ color: "red", fontSize: "12px" }}>
            {suggestionsError}
          </div>
        )}
      </div>
      <button type="submit" onClick={handleSubmit}>
        제출하기
      </button>
    </div>
  );
};

export default Register;
