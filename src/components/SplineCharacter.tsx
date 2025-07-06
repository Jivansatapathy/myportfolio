import { useRef } from 'react';

const SplineCharacter = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="relative w-full h-full">
      <iframe 
        ref={iframeRef}
        src='https://my.spline.design/robotfollowcursorforlandingpage-aZNPGXFplWvcoOda1rpgcbIJ/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className="absolute inset-0"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default SplineCharacter; 