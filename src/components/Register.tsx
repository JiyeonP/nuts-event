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

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setContact(value);
      setContactError("");
    } else {
      setContactError("글자수가 20자를 초과했습니다.");
    }
  };

  const handleSuggestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setSuggestions(value);
      setSuggestionsError("");
    } else {
      setSuggestionsError("글자수가 200자를 초과했습니다.");
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
        <input
          type="text"
          placeholder="이메일 혹은 전화번호"
          value={contact}
          onChange={handleContactChange}
        />
        {contactError && <div style={{ color: "red" }}>{contactError}</div>}
      </div>
      <div>
        <div>Suggestions</div>
        <input
          placeholder="당신이 원하는 디자이너 제품, 당신이 서비스에 등록하려는 이유, 당신의 오늘 저녁 메뉴, 당신의 하루 일과"
          value={suggestions}
          onChange={handleSuggestionsChange}
        />
        {suggestionsError && (
          <div style={{ color: "red" }}>{suggestionsError}</div>
        )}
      </div>
      <button type="submit" onClick={handleSubmit}>
        제출하기
      </button>
    </div>
  );
};

export default Register;
