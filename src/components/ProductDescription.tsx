import React from 'react';

// Define the structure of a node in your JSON
interface Node {
  type: string;
  text?: string;
  children?: Node[];
  format?: number;
  tag?: string;
}

// Define the props for your component
interface ProductDescriptionProps {
  descriptionJson: any;
  name: string;
  images?: Array<{ image: { url: string } }>;
}

// Function to apply text formatting
const applyFormatting = (text: string, format: number) => {
  let formattedText = <>{text}</>;
  if (format & 1) formattedText = <strong>{formattedText}</strong>;
  if (format & 2) formattedText = <em>{formattedText}</em>;
  if (format & 8) formattedText = <span style={{ textDecoration: 'underline' }}>{formattedText}</span>;
  return formattedText;
};

// Recursive function to render each node of the JSON
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
      const HeadingTag = node.tag as keyof JSX.IntrinsicElements || 'h1';
      return (
        <HeadingTag className='my-4 font-bold'>
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