import { forwardRef } from "react";
import BottomSheet from "./BottomSheet";
import BottomSheetHeader from "./BottomSheetHeader";

interface modalProps {
  isShow: boolean;
  isPost?: boolean;
  modalData?: any;
  onPostEdit: () => void;
  onPostDelete: () => void;
  onCommentReply: () => void;
  onCommentEdit: () => void;
  onCommentDelete: () => void;
  onReport: () => void;
  children?: React.ReactNode;
}

const ActionSheet = forwardRef<HTMLElement, modalProps>(
  (props: modalProps, ref) => {
    const {
      isShow,
      isPost,
      modalData,
      onPostEdit,
      onPostDelete,
      onCommentReply,
      onCommentEdit,
      onCommentDelete,
      onReport,
    } = props;

    // 게시물수정
    const postOptions = [
      { label: "수정", action: onPostEdit },
      { label: "삭제", action: onPostDelete },
    ];

    // 내가 쓴 댓글일때
    const myCommentOptions = [
      { label: "답댓글", action: onCommentReply },
      { label: "수정", action: onCommentEdit },
      { label: "삭제", action: onCommentDelete },
    ];

    // 다른사람이 쓴 댓글일때
    const otherCommentOptions = [
      { label: "답댓글", action: onCommentReply },
      { label: "신고", action: onReport },
    ];

    // 내가 쓴 답댓글일때
    const myMoreCommentOptions = [
      { label: "수정", action: onCommentEdit },
      { label: "삭제", action: onCommentDelete },
    ];

    // 다른사람이 쓴 답댓글일때
    const otherMoreCommentOptions = [{ label: "신고", action: onReport }];

    // 부모요소가 있는지 검사
    // 있으면 대댓글, 없으면 댓글
    const options = isPost
      ? postOptions
      : modalData.parent
        ? modalData.child.isUser
          ? myMoreCommentOptions
          : otherMoreCommentOptions
        : modalData.child.isUser
          ? myCommentOptions
          : otherCommentOptions;

    return (
      <BottomSheet isShow={isShow} ref={ref}>
        <BottomSheetHeader />
        <div className="flex flex-col gap-[0.8rem]">
          <ul className="bg-gray14">
            {options?.map((option, index) => (
              <li
                className={`flex items-center justify-center w-full h-[5.6rem] py-[1.4rem] text-[1.6rem] cursor-pointer text-center font-pretendard font-normal leading-6 ${
                  index !== options.length - 1 ? "border-b border-gray13" : ""
                } ${option.label === "삭제" || option.label === "신고" ? "text-danger" : "text-white"}`}
                key={index}
                onClick={option.action}
              >
                {option.label}
              </li>
            ))}
          </ul>
          <ul className="bg-gray14">
            <li className="flex items-center justify-center h-[5.6rem] py-[1.4rem] text-[1.6rem] cursor-pointer text-white text-center font-pretendard font-normal leading-6">
              취소
            </li>
          </ul>
        </div>
      </BottomSheet>
    );
  },
);

export default ActionSheet;
