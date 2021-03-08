import React, {useState} from 'react';

const Thumbnail = ({thumbnail}) => {
  const [expandThumbnail, setExpandThumbnail] = useState(false);

  const toggleThumbnail = () => {
    setExpandThumbnail(!expandThumbnail);
  };

  return (
    <>
      <img
        onClick={() => setExpandThumbnail(!expandThumbnail)}
        className={!expandThumbnail ? "AnswerThumbnail" : "AnswerExpandedThumbnail"}
        src={thumbnail}
        alt="no image"
      />
    </>
  );
};

export default Thumbnail;
