import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
    return (
      <section className="skeleton-section">
        <h2 className="skeleton-title">
          <Skeleton height={36} width={`74vw`} />
          <Skeleton circle={true} height={44} width={44} />
        </h2>

        <Skeleton height={48} />

        <Skeleton height={180} />
        <h4 className="card-title">
          <Skeleton height={36} />
        </h4>
        <div className="skeletion-card">
          <p className="card-channel">
            <Skeleton width={`46vw`} height={180} />
          </p>
          <p className="card-channel">
            <Skeleton width={`40vw`} height={180} />
          </p>
        </div>

        <ul className="skeleton-list">
          <h4 className="card-title">
            <Skeleton height={36} width={156} />
          </h4>
          {Array(6)
            .fill()
            .map((item, index) => (
              <li className="skeleton-title" key={index}>
                <Skeleton circle={true} height={148} width={148} />
                <Skeleton height={148} width={`44vw`}/>
              </li>
            ))}
          </ul>
      </section>
    );
  };
  export default SkeletonCard;
