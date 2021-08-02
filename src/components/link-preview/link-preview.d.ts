interface ImageShape {
  /** The url string to be passed to image src */
  url: string;
  /** The string to be passed to image alt */
  alt?: string;
}

export interface LinkPreviewProps {
  description?: string;
  /** The config for the image to be displayed */
  image?: ImageShape;
  /** Flag to trigger the loading animation */
  isLoading?: boolean;
  /** The callback to handle the deleting of a Preview, to hide the close button do not set this prop */
  onClose?: (url: string) => void;
  /** The title to be displayed */
  title?: string;
  /** The url string to be displayed and to serve as the link's src */
  url?: string;
}

declare function LinkPreview(props: LinkPreviewProps): JSX.Element;

export default LinkPreview;
