import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Gift, Star, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const SpecialOffers = () => {
  const [offers, setOffers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, getSpecialOffers } = useAuth();

  useEffect(() => {
    const fetchOffers = async () => {
      if (user && (user.role === 'seller' || user.role === 'wholesaler')) {
        try {
          const offersData = await getSpecialOffers();
          setOffers(offersData);
        } catch (error) {
          console.error('Error fetching offers:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [user, getSpecialOffers]);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!offers || !offers.isEligible) {
    return null;
  }

  const getOfferIcon = (offerName) => {
    if (offerName.includes('Welcome')) return <Gift className="w-6 h-6" />;
    if (offerName.includes('Premium')) return <Star className="w-6 h-6" />;
    if (offerName.includes('Bulk')) return <TrendingUp className="w-6 h-6" />;
    return <Gift className="w-6 h-6" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Special Offers</h2>
        <div className="flex items-center text-sm text-green-600">
          <CheckCircle className="w-4 h-4 mr-1" />
          Eligible
        </div>
      </div>

      {/* Commission Rate */}
      <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Commission Rate</h3>
            <p className="text-sm text-gray-600">Your current commission rate</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">
              {offers.commissionRate}%
            </div>
            <div className="text-xs text-gray-500">per sale</div>
          </div>
        </div>
      </div>

      {/* Available Offers */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Available Offers</h3>
        {offers.availableOffers?.map((offer, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                {getOfferIcon(offer.name)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{offer.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                <div className="flex items-center mt-2 text-sm text-orange-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {offer.discountPercentage}% discount
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applied Offers */}
      {offers.appliedOffers && offers.appliedOffers.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Applied Offers</h3>
          {offers.appliedOffers.map((offer, index) => (
            <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{offer.offerName}</h4>
                  <div className="flex items-center mt-2 text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {offer.discountPercentage}% discount applied
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    Valid until {formatDate(offer.validUntil)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Benefits */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Your Benefits</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            Reduced commission rates
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            Priority customer support
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            Early access to new features
          </li>
          <li className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
            Bulk order discounts
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpecialOffers;
