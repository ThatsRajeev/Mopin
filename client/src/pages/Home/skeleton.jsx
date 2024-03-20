import React from "react";
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';

const SkeletonSection = styled.section`
  padding: 32px 16px;
  max-height: 100vh;
  overflow-y: hidden;
`;

const SkeletonTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h4`
  margin: 16px 0 8px;
`;

const SkeletonCard = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SkeletonListItem = styled.li``;

const SkeletonList = styled.ul`
  margin-top: 16px;
`;

const SkeletonCardComponent = () => {
  return (
    <SkeletonSection>
        <Skeleton variant="rectangular" height={148} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px'  }} />

      <CardTitle>
        <Skeleton height={48} sx={{ bgcolor: '#d9d9d9' }} />
      </CardTitle>

      <SkeletonCard>
        <Skeleton variant="rectangular" width={`46vw`} height={158} sx={{ bgcolor: '#d9d9d9', borderRadius: '28px 12px' }} />
        <Skeleton variant="rectangular" width={`40vw`} height={158} sx={{ bgcolor: '#d9d9d9', borderRadius: '28px 12px' }} />
      </SkeletonCard>

      <CardTitle>
        <Skeleton height={38} width={186} sx={{ bgcolor: '#d9d9d9' }} />
      </CardTitle>

      <SkeletonCard>
        <Skeleton variant="rectangular" width={`28vw`} height={120} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
        <Skeleton variant="rectangular" width={`28vw`} height={120} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
        <Skeleton variant="rectangular" width={`28vw`} height={120} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
      </SkeletonCard>

      <SkeletonList>
        <CardTitle>
          <Skeleton height={38} width={186} sx={{ bgcolor: '#d9d9d9' }} />
        </CardTitle>
        {Array(6)
          .fill()
          .map((item, index) => (
            <SkeletonListItem key={index}>
              <Skeleton variant="rectangular" height={148} sx={{ bgcolor: '#d9d9d9', borderRadius: '64px 16px 16px 64px' }} />
            </SkeletonListItem>
          ))}
      </SkeletonList>
    </SkeletonSection>
  );
};

export default SkeletonCardComponent;
