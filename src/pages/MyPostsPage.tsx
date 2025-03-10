import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import HeaderButton from "../components/Header/HeaderButton";
import PostListCard from "../components/Home/PostListCard";
import LeftArrowIcon from "./../assets/icons/LeftArrowIcon.svg?react";
import AlertCircleError from "./../assets/icons/AlertCirlcleError.svg?react";
import EmptyList from "../components/common/EmptyList";
import { useRecoilValue } from "recoil";
import { sortedPostListState } from "../recoil/postListState";
import { userTokenState } from "../recoil/atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "../types/ottPost";

// 현재 로그인 한 사용자의 id 임시 지정
const currentUserId = 3;

export default function MyPostsPage() {
  const nav = useNavigate();
  const userToken = useRecoilValue(userTokenState);
  const [postList, setPostList] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*   const postList = useRecoilValue(sortedPostListState);
  // 현재 로그인 한 사용자의 id를 비교해서 필터링
  const filteredPostList = postList.filter(
    (post) => post.userId === currentUserId,
  ); */

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URI}/api/v1/user/my/posts`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${userToken.accessToken}`,
            },
          },
        );
        console.log(response.data);
        setPostList(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userToken]);

  console.log(postList);

  return (
    <>
      <Header
        leftChild={
          <HeaderButton onClick={() => nav(-1)}>
            <LeftArrowIcon />
          </HeaderButton>
        }
        title="작성한 글"
      />
      <main className="main-header">
        {postList === null || postList.length === 0 ? (
          <div className="h-screen-minus-46">
            <EmptyList
              icon={<AlertCircleError />}
              mainText="작성하신 게시글이 없어요"
              subText={<p>첫 게시글을 작성해주세요</p>}
            />
          </div>
        ) : (
          postList.map((post) => <PostListCard key={post.postId} post={post} />)
        )}
      </main>
    </>
  );
}
