"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { Clock, ArrowLeft, Activity, User, Search, Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LogsRecentPage() {
  const { userActions, dispatch } = useApp();

  useEffect(() => {
    dispatch({
      type: 'ADD_USER_ACTION',
      payload: {
        id: Date.now().toString(),
        action: 'Viewed logs page',
        timestamp: new Date(),
      },
    });
  }, [dispatch]);

  const recentActions = userActions.slice(0, 20);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Recent Activity Logs
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Last 20 user actions tracked in real-time
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Activity Timeline
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing {recentActions.length} of {userActions.length} total actions
            </p>
          </div>

          <div className="p-6">
            {recentActions.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActions.map((action, index) => (
                  <div key={action.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {action.action}
                      </h3>
                      {action.details && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {action.details}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {new Date(action.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
