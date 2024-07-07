import React, { useState } from "react";
import "../../styles/memo.css";
import { FaPencilAlt } from "react-icons/fa"; 

const Memo = () => {
  const [memo, setMemo] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveMemo = () => {
    setIsEditing(false);
  };

  return (
    <div className="memo">
      <div className="memoTitle">
        <span># 메모</span>
        <button className="editButton" onClick={() => setIsEditing(true)}>
          <FaPencilAlt />
        </button>
      </div>
      {isEditing ? (
        <div className="memoContent">
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요..."
          ></textarea>
          <button className="saveButton" onClick={handleSaveMemo}>
            저장
          </button>
        </div>
      ) : (
        <div className="memoContent">
          <p>{memo}</p>
        </div>
      )}
    </div>
  );
};

export default Memo;
