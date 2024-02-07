import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
    return (
      <section className="skeleton-section">
        <h2 className="skeleton-title">
          <Skeleton height={36} width={`74vw`} />
          <Skeleton circle={true} height={50} width={50} />
        </h2>

        <Skeleton height={48} />

        <Skeleton height={180} />
        <h4 className="card-title">
          <Skeleton height={36} />
        </h4>
        <div className="skeletion-card">
          <p className="card-channel">
            <Skeleton width={`56vw`} height={180} />
          </p>
          <p className="card-channel">
            <Skeleton width={`30vw`} height={180} />
          </p>
        </div>

        <ul className="skeleton-list">
          <h4 className="card-title">
            <Skeleton height={36} />
          </h4>
          {Array(6)
            .fill()
            .map((item, index) => (
              <li className="skeleton-title" key={index}>
                <Skeleton circle={true} height={164} width={164} />
                <Skeleton height={180} width={`50vw`}/>
              </li>
            ))}
          </ul>
      </section>
    );
  };
  export default SkeletonCard;
