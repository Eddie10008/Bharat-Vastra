const express = require('express');
const { body, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/payments/create-payment-intent
// @desc    Create payment intent for Stripe
// @access  Private
router.post('/create-payment-intent', [
  auth,
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  body('currency').optional().isIn(['aud', 'usd']).withMessage('Currency must be AUD or USD'),
  body('orderId').optional().isString().withMessage('Order ID must be a string')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency = 'aud', orderId } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      metadata: {
        orderId: orderId || '',
        userId: req.user.id
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ message: 'Payment processing error' });
  }
});

// @route   POST /api/payments/confirm-payment
// @desc    Confirm payment and update order
// @access  Private
router.post('/confirm-payment', [
  auth,
  body('paymentIntentId').isString().withMessage('Payment intent ID is required'),
  body('orderId').isString().withMessage('Order ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentIntentId, orderId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update order payment status
      // This would typically update the order in your database
      // For now, we'll just return success
      
      res.json({
        message: 'Payment confirmed successfully',
        paymentStatus: 'completed',
        transactionId: paymentIntent.id
      });
    } else {
      res.status(400).json({
        message: 'Payment not completed',
        paymentStatus: paymentIntent.status
      });
    }

  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ message: 'Payment confirmation error' });
  }
});

// @route   POST /api/payments/upi-payment
// @desc    Process UPI payment
// @access  Private
router.post('/upi-payment', [
  auth,
  body('upiId').isString().withMessage('UPI ID is required'),
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  body('orderId').isString().withMessage('Order ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { upiId, amount, orderId } = req.body;

    // In a real implementation, you would integrate with a UPI payment gateway
    // For now, we'll simulate a successful payment
    
    const transactionId = `UPI_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      message: 'UPI payment initiated successfully',
      transactionId,
      upiId,
      amount,
      status: 'pending',
      paymentUrl: `upi://pay?pa=${upiId}&pn=BharatVastra&am=${amount}&tn=Order${orderId}`
    });

  } catch (error) {
    console.error('UPI payment error:', error);
    res.status(500).json({ message: 'UPI payment processing error' });
  }
});

// @route   POST /api/payments/bank-transfer
// @desc    Process bank transfer payment
// @access  Private
router.post('/bank-transfer', [
  auth,
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  body('orderId').isString().withMessage('Order ID is required'),
  body('bankDetails').isObject().withMessage('Bank details are required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, orderId, bankDetails } = req.body;

    // Generate bank transfer reference
    const transferReference = `BT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      message: 'Bank transfer details generated',
      transferReference,
      amount,
      bankDetails: {
        accountNumber: '1234567890',
        accountName: 'Bharat Vastra Pvt Ltd',
        ifscCode: 'BARB0001234',
        bankName: 'Bank of Baroda'
      },
      instructions: [
        'Transfer the exact amount to the provided bank account',
        'Use the transfer reference in the payment description',
        'Payment will be confirmed within 24-48 hours',
        'Order will be processed once payment is verified'
      ]
    });

  } catch (error) {
    console.error('Bank transfer error:', error);
    res.status(500).json({ message: 'Bank transfer processing error' });
  }
});

// @route   GET /api/payments/methods
// @desc    Get available payment methods
// @access  Public
router.get('/methods', async (req, res) => {
  try {
    const paymentMethods = [
      {
        id: 'cod',
        name: 'Cash on Delivery',
        description: 'Pay when you receive your order',
        icon: '💰',
        available: true,
        processingTime: '0 days'
      },
      {
        id: 'online',
        name: 'Online Payment',
        description: 'Pay securely with cards, UPI, or net banking',
        icon: '💳',
        available: true,
        processingTime: '0 days'
      },
      {
        id: 'upi',
        name: 'UPI Payment',
        description: 'Pay using UPI apps like Google Pay, PhonePe',
        icon: '📱',
        available: true,
        processingTime: '0 days'
      },
      {
        id: 'bank-transfer',
        name: 'Bank Transfer',
        description: 'Transfer money directly to our bank account',
        icon: '🏦',
        available: true,
        processingTime: '1-2 days'
      }
    ];

    res.json(paymentMethods);

  } catch (error) {
    console.error('Get payment methods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/payments/verify-payment
// @desc    Verify payment status
// @access  Private
router.post('/verify-payment', [
  auth,
  body('transactionId').isString().withMessage('Transaction ID is required'),
  body('paymentMethod').isIn(['stripe', 'upi', 'bank-transfer']).withMessage('Invalid payment method')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { transactionId, paymentMethod } = req.body;

    let paymentStatus = 'pending';

    if (paymentMethod === 'stripe') {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(transactionId);
        paymentStatus = paymentIntent.status;
      } catch (error) {
        paymentStatus = 'failed';
      }
    } else if (paymentMethod === 'upi') {
      // In real implementation, verify with UPI gateway
      paymentStatus = 'completed';
    } else if (paymentMethod === 'bank-transfer') {
      // In real implementation, verify with bank
      paymentStatus = 'pending';
    }

    res.json({
      transactionId,
      paymentMethod,
      status: paymentStatus,
      verifiedAt: new Date()
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Payment verification error' });
  }
});

// @route   POST /api/payments/refund
// @desc    Process refund
// @access  Private
router.post('/refund', [
  auth,
  body('transactionId').isString().withMessage('Transaction ID is required'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Refund amount must be positive'),
  body('reason').isString().withMessage('Refund reason is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { transactionId, amount, reason } = req.body;

    // Process refund through Stripe
    const refund = await stripe.refunds.create({
      payment_intent: transactionId,
      amount: Math.round(amount * 100), // Convert to cents
      reason: 'requested_by_customer',
      metadata: {
        reason: reason,
        userId: req.user.id
      }
    });

    res.json({
      message: 'Refund processed successfully',
      refundId: refund.id,
      amount: amount,
      status: refund.status
    });

  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ message: 'Refund processing error' });
  }
});

module.exports = router;
