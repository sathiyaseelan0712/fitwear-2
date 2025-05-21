import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  actionLink: string;
}

const EmptyState = ({ 
  icon = <Heart className="w-12 h-12 text-gray-400" />,
  title, 
  description, 
  actionText, 
  actionLink 
}: EmptyStateProps) => {
  return (
    <div className="text-center max-w-md mx-auto py-12">
      <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{description}</p>
      <Link
        to={actionLink}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {actionText}
      </Link>
    </div>
  );
};

export default EmptyState;