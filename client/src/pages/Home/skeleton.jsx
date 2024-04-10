import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/system';

const SkeletonSection = styled('section')(({ isPcView }) => ({
  padding: '32px 16px',
  height: '100vh',
  overflowY: 'hidden',
  maxWidth: isPcView ? '1200px' : 'unset',
  margin: isPcView ? '32px auto' : 'auto',
}));

const SkeletonTitle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CardTitle = styled('h4')({
  margin: '16px 0 8px',
});

const SkeletonCard = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const SkeletonButtons = styled('div')({
  display: 'flex',
  gap: '16px',
  marginTop: '28px'
});

const SkeletonText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  marginBottom: '48px'
});

const SkeletonListItem = styled('li')({
  marginTop: '16px',
  listStyle: 'none',
});

const SkeletonList = styled('ul')({
  marginTop: '16px',
});

const SkeletonCardComponent = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    (windowWidth > 768) ? (
      <SkeletonSection isPcView={"true"}>
        <SkeletonText>
          <Skeleton variant="rectangular" width={`54vw`} height={56} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
          <Skeleton variant="rectangular" width={`48vw`} height={56} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
          <Skeleton variant="rectangular" width={`36vw`} height={56} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
        </SkeletonText>
        <SkeletonText>
          <Skeleton variant="rectangular" width={`40vw`} height={36} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
          <Skeleton variant="rectangular" width={`36vw`} height={36} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
        </SkeletonText>
        <SkeletonButtons>
          <Skeleton variant="rectangular" width={`18vw`} height={64} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
          <Skeleton variant="rectangular" width={`18vw`} height={64} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
        </SkeletonButtons>
      </SkeletonSection>
    ) : (
      <SkeletonSection>
        <Skeleton variant="rectangular" height={148} sx={{ bgcolor: '#d9d9d9', borderRadius: '12px' }} />
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
    )
  );
};

export default SkeletonCardComponent;
