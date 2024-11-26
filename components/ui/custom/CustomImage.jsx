import React from "react";
import Image from "next/image";

const CustomImage = ({ src, alt }) => {
  return (
    <Image
      className="mx-auto rounded-lg object-contain" //object contain css prop applied here instead of objectFit prop on Image
      alt={alt}
      src={src}
      fill={true} //allows image to fill parent
      priority
      //Sizes prop explained: This tells nextjs how to create the srcset for this image.
      // The sizes prop describes the max width an image could be at a given breakpoint and setting the image size using vw units
      sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 50vw"
    />
  );
};

export default CustomImage;
