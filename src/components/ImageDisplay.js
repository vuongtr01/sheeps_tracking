import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ImageDisplay = (props) => {
    const { data } = props;
    return (
        <ImageList sx={{ width: 250, height: 450 }} cols={1} rowHeight={164}>
            {data.map((imgsrc) => (
                <ImageListItem key={`img-${Math.random() * 10000000}`}>
                <img
                    src={imgsrc}
                    alt='capture'
                    loading="lazy"
                />
        </ImageListItem>
      ))}
    </ImageList>
    )
};

export default ImageDisplay;
