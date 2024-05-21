import React, { useState, useEffect } from "react";
import InputCheck from "../../assets/icons/InputCheck.svg?react";
import InputDelete from "../../assets/icons/InputDelete.svg?react";
import InputError from "../../assets/icons/InputError.svg?react";

interface InputProps {
  disabled?: boolean;
  label: string;
  placeholder: string;
  maxLen: number;
  onClick?: () => void;
}

export default function Input(props: InputProps) {
  const { disabled, label, placeholder, maxLen, onClick } = props;
  const [inputValue, setInputValue] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [message, setMessage] = useState<string>("");

  /**
   * input이 변경될때마다 실행
   */
  useEffect(() => {
    if (inputValue.length > maxLen) {
      setIsError(true);
      setIsSuccess(false);
    } else if (inputValue.length > 0) {
      setIsError(false);
      setIsSuccess(true);
    } else {
      setIsError(false);
      setIsSuccess(false);
    }

    if (isSuccess) {
      setMessage("성공");
    } else if (isError) {
      setMessage("실패");
    } else {
      setMessage("");
    }
  }, [inputValue, isSuccess, isError, setIsSuccess, setIsError]);

  /**
   * input이 변경될때
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= maxLen) {
      setInputValue(value);
    }
  };

  /**
   * 삭제 아이콘 클릭
   * @param event
   */
  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setTimeout(() => {
      setInputValue("");
      setIsError(false);
      setIsSuccess(false);
    }, 0);
  };

  /**
   * 분기에 맞는 border 색상
   * @returns
   */
  const getBorderClass = () => {
    if (isSuccess) return "border-success";
    if (isError) return "border-error";
    if (disabled) return "cursor-default border-gray9 text-gray9";
    return "border-gray8";
  };

  /**
   * 분기에 맞는 text 색상
   * @returns
   */
  const getTextClass = () => {
    if (isSuccess) return "text-success";
    if (isError) return "text-error";
    return "text-gray8";
  };

  /**
   * 성공일때
   * @param param0
   * @returns
   */
  const RenderSuccessIcons = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex gap-[1.2rem]">
      <div
        className="flex justify-center items-center w-[1.6rem] h-[1.6rem]"
        onClick={onClick}
      >
        <InputCheck />
      </div>
      <div
        className="flex ml-auto justify-center items-center w-[1.6rem] h-[1.6rem] cursor-pointer"
        onClick={handleDeleteClick}
      >
        <InputDelete />
      </div>
    </div>
  );

  /**
   * 성공, 에러 여부
   * @param param0
   * @returns
   */
  const RenderDefaultIcons = ({ onClick }: { onClick?: () => void }) => (
    <>
      {isSuccess && (
        <div
          className="flex ml-auto justify-center items-center w-[1.6rem] h-[1.6rem]"
          onClick={onClick}
        >
          <InputCheck />
        </div>
      )}
      {isError && (
        <div
          className="flex ml-auto justify-center items-center w-[1.6rem] h-[1.6rem]"
          onClick={onClick}
        >
          <InputError />
        </div>
      )}
    </>
  );

  /**
   * 에러일때
   * @param param0
   * @returns
   */
  const RenderErrorIcons = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex gap-[1.2rem]">
      <div
        className="flex justify-center items-center w-[1.6rem] h-[1.6rem]"
        onClick={onClick}
      >
        <InputError />
      </div>
      <div
        className="flex justify-center items-center w-[1.6rem] h-[1.6rem] cursor-pointer"
        onClick={handleDeleteClick}
      >
        <InputDelete />
      </div>
    </div>
  );

  return (
    <div
      className={`gap-[0.2rem] box-border flex flex-col w-[32rem] ${getTextClass()}`}
    >
      <div
        className={`box-border rounded-[0.4rem] flex flex-col items-start justify-start px-[1.2rem] py-[0.8rem] w-[32rem] h-[5.6rem] border ${getBorderClass()}`}
      >
        <div className="w-full">
          <p className={`w-full text-caption ${getTextClass()}`}>{label}</p>
          <div className="items-center flex gap-[1.2rem] w-full">
            <div className="text-subtitle w-[24rem]">
              <input
                className="w-full text-white bg-transparent outline-none placeholder-gray8"
                placeholder={isFocused ? "" : placeholder}
                value={inputValue}
                onChange={handleInputChange}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 0)}
              />
            </div>
            {isFocused ? (
              isSuccess ? (
                <RenderSuccessIcons onClick={onClick} />
              ) : isError ? (
                <RenderErrorIcons onClick={onClick} />
              ) : null
            ) : (
              <RenderDefaultIcons onClick={onClick} />
            )}
          </div>
        </div>
      </div>
      <div
        className={`text-[1.1rem] px-[1.2rem] flex h-[1.2rem] items-center ${getTextClass()}`}
      >
        <p>{message}</p>
        <p className="ml-auto">
          {inputValue.length}/{maxLen}
        </p>
      </div>
    </div>
  );
}
