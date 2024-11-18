import React from "react";

import { Site } from "@/models/site";
import StarRating from "@/components/common/StarRating";
function RatingComponent({ site }: { site: Site }) {
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
