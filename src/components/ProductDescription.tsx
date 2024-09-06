import React from 'react';

interface Node {
  type: string;
  text?: string;
  children?: Node[];
  format?: number;
  tag?: string;
}

interface ProductDescriptionProps {
  descriptionJson: any;
  name: string;
  images?: Array<{ image: { url: string } }>;
}

const applyFormatting = (text: string, format: number) => {
  let formattedText = <>{text}</>;
  if (format & 1) formattedText = <strong>{formattedText}</strong>;
  if (format & 2) formattedText = <em>{formattedText}</em>;
  if (format & 8) formattedText = <span style={{ textDecoration: 'underline' }}>{formattedText}</span>;
  return formattedText;
};

const renderNode = (node: Node): React.ReactNode => {
  switch (node.type) {
    case 'paragraph':
      return (
        <p className='my-4'>
          {node.children?.map((childNode, index) => (
            <React.Fragment key={index}>{renderNode(childNode)}</React.Fragment>
          ))}
        </p>
      );
    case 'text':
      return node.text ? applyFormatting(node.text, node.format || 0) : null;
    case 'heading':
      const HeadingTag = `h${node.tag}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const headingClasses: Record<typeof HeadingTag, string> = {
        h1: 'text-4xl font-bold my-6',
        h2: 'text-3xl font-semibold my-5',
        h3: 'text-2xl font-medium my-4',
        h4: 'text-xl font-medium my-3',
        h5: 'text-lg font-medium my-2',
        h6: 'text-base font-medium my-2',
      };
      return (
        <HeadingTag className={headingClasses[HeadingTag]}>
          {node.children?.map((childNode, index) => (
            <React.Fragment key={index}>{renderNode(childNode)}</React.Fragment>
          ))}
        </HeadingTag>
      );
    default:
      return null;
  }
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({ descriptionJson, name, images }) => {
  const content = descriptionJson.root.children;

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>{name}</h1>
      <div className='text-base'>
        {content.map((node: Node, index: number) => (
          <React.Fragment key={index}>{renderNode(node)}</React.Fragment>
        ))}
      </div>
      {images && images.length > 0 && (
        <div className='mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Images</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {images.map((img, index) => (
              <img
                key={index}
                src={img.image.url}
                alt={`${name} - Image ${index + 1}`}
                className='w-full h-auto rounded-lg shadow-md'
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;