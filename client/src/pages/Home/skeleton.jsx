import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <section className="skeleton-section">
      <Skeleton height={180} highlightColor="#d9d9d9" />
      <h4 className="card-title">
        <Skeleton height={36} highlightColor="#d9d9d9" />
      </h4>
      <div className="skeletion-card">
        <p className="card-channel">
          <Skeleton width={`46vw`} height={180} highlightColor="#d9d9d9" />
        </p>
        <p className="card-channel">
          <Skeleton width={`40vw`} height={180} highlightColor="#d9d9d9" />
        </p>
      </div>

      <h4 className="card-title">
        <Skeleton height={28} width={186} highlightColor="#d9d9d9" />
      </h4>
      <div className="skeletion-card meal-skeleton">
        <p className="card-channel">
          <Skeleton width={`28vw`} height={120} highlightColor="#d9d9d9" />
        </p>
        <p className="card-channel">
          <Skeleton width={`28vw`} height={120} highlightColor="#d9d9d9" />
        </p>
        <p className="card-channel">
          <Skeleton width={`28vw`} height={120} highlightColor="#d9d9d9" />
        </p>
      </div>

      <ul className="skeleton-list">
        <h4 className="card-title">
          <Skeleton height={28} width={186} highlightColor="#d9d9d9" />
        </h4>
        {Array(6)
          .fill()
          .map((item, index) => (
            <li className="skeleton-titli" key={index}>
              <Skeleton height={148} highlightColor="#d9d9d9" />
            </li>
          ))}
      </ul>
    </section>
  );
};
export default SkeletonCard;
