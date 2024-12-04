import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios"; // Cấu hình axios
import styles from "../News.module.scss"; 
import { PostCatelogues, Posts } from "@/model/Posts";
import { useLocation, useNavigate } from "react-router-dom";

// Component PostDetail (hiển thị chi tiết bài viết)
const PostDetail: React.FC<{ post: Posts | null }> = ({ post }) => {
  if (!post) {
    return <p>Chọn một bài viết để xem chi tiết.</p>;
  }
  return (
    <div className={styles.postDetail}>
      <img src={post.image} alt={post.title} className={styles.detailImage} />
      <h2 className={styles.detailTitle}>{post.title}</h2>
      <p className={styles.detailMetaDescription}>{post.meta_description}</p>
      <div
        className={styles.detailContent}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <p className={styles.detailUpdatedAt}>
        Cập nhật: {new Date(post.updated_at).toLocaleString()}
      </p>
    </div>
  );
};

const PostDetails = () => {
  const location = useLocation(); // Lấy state từ location
  const { postId } = location.state || {}; // Lấy postId từ location.state
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null); // State để lưu bài viết được chọn
  const navigate = useNavigate();

  // Hàm fetch chi tiết bài viết từ API
  const fetchPostDetail = async (postId: number): Promise<Posts> => {
    const response = await instance.get(`/posts/${postId}`);
    return response.data;
  };

  // Query để fetch chi tiết bài viết (dựa vào postId)
  const { data: post, isLoading: postLoading, isError: postError } = useQuery<Posts>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostDetail(postId!), // Gọi API với postId
    enabled: !!postId,  // Chỉ gọi API khi postId có giá trị
  });

  // Query posts (danh sách bài viết) và categories (danh mục bài viết)
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
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const { data, isLoading: categoriesLoading, isError: categoriesError } = useQuery<PostCatelogues[]>({
    queryKey: ["post-catelogues"],
    queryFn: fetchData,
  });

  // Kiểm tra trạng thái loading và error
  if (postLoading || postsLoading || categoriesLoading) {
    return <p>Đang tải...</p>;
  }

  if (postError || !post) {
    return <p>Đã xảy ra lỗi khi tải bài viết.</p>;
  }

  if (postsError || !posts) {
    return <p>Đã xảy ra lỗi khi tải danh sách bài viết.</p>;
  }

  if (categoriesError || !data) {
    return <p>Đã xảy ra lỗi khi tải danh mục bài viết.</p>;
  }

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
        {/* <div className={styles.postCategory}>
          <h3 className={styles.categoryTitle}>DANH MỤC BÀI VIẾT</h3>
          <ul className={styles.categoryList}>
            {data.map((category) => (
              <li key={category.id} className={styles.categoryItem}>
                {category.name}
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      {/* Khu vực chính hiển thị chi tiết bài viết */}
      <div className={styles.postMain}>
        <PostDetail post={post} /> {/* Hiển thị chi tiết bài viết */}
      </div>
    </div>
  );
};

export default PostDetails;
