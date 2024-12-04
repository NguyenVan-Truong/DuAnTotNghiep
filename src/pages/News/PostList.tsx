import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "@/configs/axios"; // Cấu hình axios
import styles from "./News.module.scss"; 
import { PostCatelogues, Posts } from "@/model/Posts";

// Component PostCard (hiển thị chi tiết một bài viết tóm tắt)
const PostCard: React.FC<{ post: Posts }> = ({ post }) => {
    const navigate = useNavigate();
    const handlePostClick = () => {
        navigate(`/chi-tiet-bai-viet/${post.slug}`, {
        state: {
            postId: post.id, // Truyền postId qua state
        },
        });
    };
  return (
    <div className={styles.postCard} onClick={handlePostClick}>
      <img src={post.image} alt={post.title} className={styles.postImage} />
      <div className={styles.postContent}>
        <h4 className={styles.postTitle}>{post.title}</h4>
        <p className={styles.postDescription}>{post.meta_description}</p>
      </div>
    </div>
  );
};

const PostList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    location.state?.id || null
  );

  const fetchPosts = async (): Promise<Posts[]> => {
    const response = await instance.get("/posts");
    return response.data.data;
  };

  const fetchData = async (): Promise<PostCatelogues[]> => {
    const response = await instance.get("/post-catelogues");
    return response.data;
  };

  // Query posts
  const { data: posts, isLoading: postsLoading, isError: postsError } = useQuery<Posts[]>({
    queryKey: ["posts"], // Dữ liệu bài viết
    queryFn: fetchPosts,
  });

  // Query categories
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery<PostCatelogues[]>({
    queryKey: ["post-catelogues"], // Dữ liệu danh mục bài viết
    queryFn: fetchData,
   
         // Log dữ liệu khi thành công
      
  });
  console.log("Dữ liệu danh mục: ", categories);
  console.log(posts);

  // Kiểm tra trạng thái loading và error
  if (postsLoading || categoriesLoading) {
    return <p>Đang tải...</p>;
  }

  if (postsError || !posts) {
    return <p>Đã xảy ra lỗi khi tải bài viết.</p>;
  }

  if (categoriesError || !categories) {
    return <p>Đã xảy ra lỗi khi tải danh mục bài viết.</p>;
  }

  // Lọc bài viết dựa trên danh mục được chọn
  const filteredPosts = selectedCategoryId
  ? posts.filter((post) =>
      post.catelogues && post.catelogues.some((category) => category.id === selectedCategoryId) // Kiểm tra xem categories có tồn tại không
    )
  : posts;
  
    const handlePostClick = (slug: string, postId: number) => {
        // Truyền thêm `postId` vào state
        navigate(`/chi-tiet-bai-viet/${slug}`, {
          state: {
            postId: postId, // Dữ liệu cần truyền
          },
        });
      };

  return (
    <div className={styles.postContainer}>
      {/* Sidebar hiển thị danh sách tiêu đề */}
      <div className={styles.postSidebar}>
        <h3 className={styles.sidebarTitle}>BÀI VIẾT MỚI NHẤT</h3>
        <ul className={styles.sidebarList}>
          {posts.map((post) => (
            <li key={post.id} className={styles.sidebarItem} onClick={() => handlePostClick(post.slug, post.id)}>
              <img src={post.image} alt={post.title} className={styles.sidebarImage} />
              {post.title}
            </li>
          ))}
        </ul>

        {/* Danh mục "Post" dưới bài viết mới nhất */}
        <div className={styles.postCategory}>
          <h3 className={styles.categoryTitle}>DANH MỤC BÀI VIẾT</h3>
          <ul className={styles.categoryList}>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategoryId === category.id ? styles.activeCategory : ""
                }`} // Thêm class khi danh mục được chọn
                onClick={() => setSelectedCategoryId(category.id)} // Cập nhật danh mục được chọn
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Khu vực chính hiển thị các bài viết tóm tắt */}
      <div className={styles.postMain}>
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
