import { useState, useEffect } from 'react';
import { Eye, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    _id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  useEffect(() => {
    // In a real app, fetch orders from API
    // For demo, we're using mock data
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockOrders: Order[] = [
          {
            _id: '101',
            user: {
              _id: 'u1',
              name: 'John Doe',
              email: 'john@example.com'
            },
            items: [
              {
                _id: 'i1',
                productId: '1',
                name: 'Classic Oxford Shirt',
                price: 59.99,
                quantity: 1
              },
              {
                _id: 'i2',
                productId: '3',
                name: 'Premium T-Shirt',
                price: 29.99,
                quantity: 2
              }
            ],
            totalPrice: 119.97,
            status: 'Delivered',
            createdAt: '2023-08-15T14:30:00'
          },
          {
            _id: '102',
            user: {
              _id: 'u2',
              name: 'Jane Smith',
              email: 'jane@example.com'
            },
            items: [
              {
                _id: 'i3',
                productId: '2',
                name: 'Slim Fit Jeans',
                price: 79.99,
                quantity: 1
              }
            ],
            totalPrice: 85.98,
            status: 'Processing',
            createdAt: '2023-08-17T09:15:00'
          },
          {
            _id: '103',
            user: {
              _id: 'u3',
              name: 'Michael Johnson',
              email: 'michael@example.com'
            },
            items: [
              {
                _id: 'i4',
                productId: '4',
                name: 'Wool Blend Trousers',
                price: 89.99,
                quantity: 1
              },
              {
                _id: 'i5',
                productId: '5',
                name: 'Casual Linen Shirt',
                price: 49.99,
                quantity: 1
              }
            ],
            totalPrice: 145.98,
            status: 'Pending',
            createdAt: '2023-08-17T16:45:00'
          },
          {
            _id: '104',
            user: {
              _id: 'u4',
              name: 'Sarah Williams',
              email: 'sarah@example.com'
            },
            items: [
              {
                _id: 'i6',
                productId: '3',
                name: 'Premium T-Shirt',
                price: 29.99,
                quantity: 2
              }
            ],
            totalPrice: 65.98,
            status: 'Shipped',
            createdAt: '2023-08-16T11:20:00'
          },
          {
            _id: '105',
            user: {
              _id: 'u5',
              name: 'Robert Brown',
              email: 'robert@example.com'
            },
            items: [
              {
                _id: 'i7',
                productId: '1',
                name: 'Classic Oxford Shirt',
                price: 59.99,
                quantity: 1
              },
              {
                _id: 'i8',
                productId: '2',
                name: 'Slim Fit Jeans',
                price: 79.99,
                quantity: 1
              }
            ],
            totalPrice: 145.98,
            status: 'Cancelled',
            createdAt: '2023-08-14T13:10:00'
          }
        ];
        
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);
  
  // Filter orders by search term and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order._id.includes(searchTerm) || 
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === '' || 
      order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the filteredOrders variable
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <AdminLayout title="Orders">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex-1">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
            
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {loading ? (
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded mb-4"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded mb-2"></div>
              ))}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No orders found.</p>
              <button 
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('');
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-700 font-medium">
                        #{order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                        <div className="text-sm text-gray-500">{order.user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => alert(`View order ${order._id}`)}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;