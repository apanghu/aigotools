import React from "react";

import StarRating from "@/components/common/StarRating";
function RatingComponent({ site }) {
  return (
    <div>
      <span className="rating-info">
        <StarRating maxRating={5} rating={site.rating} /> Rating:{" "}
        {site.rating.toFixed(2)} · Total votes: {site.voteCount}
      </span>
    </div>
  );
}

export default RatingComponent;
