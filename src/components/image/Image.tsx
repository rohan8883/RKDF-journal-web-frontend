import { forwardRef } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import getRatio from './getRatio';
import { ImageProps } from './types';

// ----------------------------------------------------------------------
/* eslint-disable react/display-name */

const Image = forwardRef<HTMLSpanElement, ImageProps>(
  ({ ratio, disabledEffect = false, effect = 'blur', ...other }, ref) => {
    const content = (
      <LazyLoadImage
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={
          disabledEffect ? '/assets/transparent.png' : '/assets/placeholder.svg'
        }
        width="100%"
        style={{ objectFit: 'cover' }}
        {...other}
      />
    );

    if (ratio) {
      return (
        <span
          ref={ref}
          style={{
            width: 1,
            lineHeight: 1,
            display: 'block',
            overflow: 'hidden',
            position: 'relative',
            paddingTop: getRatio(ratio)
            // '&.wrapper': {
            //   top: 0,
            //   left: 0,
            //   width: 1,
            //   height: 1,
            //   position: 'absolute',
            //   backgroundSize: 'cover !important'
            // }
          }}
        >
          {content}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        style={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative'
          // '&:wrapper': {
          //   width: 1,
          //   height: 1,
          //   backgroundSize: 'cover !important'
          // }
        }}
      >
        {content}
      </span>
    );
  }
);

export default Image;
