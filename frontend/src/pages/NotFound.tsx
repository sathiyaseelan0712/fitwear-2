import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-bold text-blue-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button variant="primary" leftIcon={<Home className="h-5 w-5" />}>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;