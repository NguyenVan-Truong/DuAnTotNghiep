import React, { useEffect, useState } from "react";
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  useEffect(() => {
    const categoryId = location.state?.id;
    if (categoryId) {
      setSelectedCategoryId(categoryId);
    }
  }, [location.state]);
  console.log("Category ID từ location.state:", location.state.id);

  const fetchPostsByCategory = async (categoryId: number | null): Promise<Posts[]> => {
    if (categoryId) {
      const response = await instance.get(`/get-post-by-catelogue/${categoryId}`);
      return response.data;
    }
    // Fetch tất cả bài viết nếu không có danh mục
    const response = await instance.get("/get-post-by-catelogue/25");
    return response.data;
  };

  const fetchData = async (): Promise<PostCatelogues[]> => {
    const response = await instance.get("/post-catelogues");
    return response.data;
  };
const fetchPosts = async (): Promise<Posts[]> => {
    const response = await instance.get("/posts");
    return response.data;
  };

  // Query posts
  const { data: posts, isLoading: postsLoading, isError: postsError } = useQuery<Posts[]>({
    queryKey: ["posts", selectedCategoryId], // Dữ liệu bài viết
    queryFn:() => fetchPostsByCategory(selectedCategoryId),
  });

  // Query categories
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery<PostCatelogues[]>({
    queryKey: ["post-catelogues"], // Dữ liệu danh mục bài viết
    queryFn: fetchData,      
  });

  const { data: postsNew, isLoading: postsNewLoading, isError: postsNewError } = useQuery<Posts[]>({
    queryKey: ["postsnew"],
    queryFn: fetchPosts,
  });

  console.log("Dữ liệu danh mục: ", categories);
  console.log("Posts", posts);

  // Xử lý trạng thái loading và lỗi
if (postsLoading || categoriesLoading || postsNewLoading) {
    return <p>Đang tải...</p>;
  }
  
  if (postsError || categoriesError || postsNewError || !posts || !categories) {
    return <p>Đã xảy ra lỗi khi tải dữ liệu.</p>;
  }

  // Lọc bài viết dựa trên danh mục được chọn
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    navigate("/tin-tuc", {
        state: { id: categoryId }, // Cập nhật state để giữ categoryId trong URL
      });
  };
  
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
          {postsNew?.map((post) => (
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
                className={styles.categoryItem}
                onClick={() => handleCategoryClick(category.id)} // Cập nhật danh mục được chọn
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Khu vực chính hiển thị các bài viết tóm tắt */}
      <div className={styles.postMain}>
        {posts?.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
            <p>Không có bài viết nào trong danh mục này.</p>
            )}
      </div>
    </div>
  );
};

export default PostList;
