import React from "react";
// 星星评分组件
const StarRating = ({ rating, maxRating = 5 }) => {
  const fullStars = Math.floor(rating); // 完整的星星
  const hasHalfStar = rating % 1 >= 0.5; // 是否有半颗星
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0); // 空星

  return (
    <div className="star-rating">
      {/* 渲染满星 */}
      {Array.from({ length: fullStars }, (_, index) => (
        <span key={`full-${index}`} className="star filled">
          ★
        </span>
      ))}

      {/* 渲染半星 */}
      {hasHalfStar && <span className="star half">★</span>}

      {/* 渲染空星 */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <span key={`empty-${index}`} className="star empty">
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
