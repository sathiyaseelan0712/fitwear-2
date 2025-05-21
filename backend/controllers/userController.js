const User = require('../models/User');
const Address = require('../models/Address');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id)
    .populate('addresses')
    .populate('wishlist')
    .select('-password -resetToken -resetTokenExpiry');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// @desc    Update user profile
// @route   PATCH /api/users/me
// @access  Private
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.role) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-password.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = {};
  ['name', 'email', 'phone', 'profilePicture'].forEach(field => {
    if (req.body[field]) filteredBody[field] = req.body[field];
  });

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  }).select('-password -resetToken -resetTokenExpiry');

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

// @desc    Delete user account
// @route   DELETE /api/users/me
// @access  Private
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { accountStatus: 'suspended' });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Update user password
// @route   PATCH /api/users/update-password
// @access  Private
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  await user.save();

  // 4) Log user in, send JWT
  const token = generateToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});

// @desc    Add address to user profile
// @route   POST /api/users/addresses
// @access  Private
exports.addAddress = catchAsync(async (req, res, next) => {
  const address = await Address.create({
    ...req.body,
    user: req.user.id
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { addresses: address._id }
  });

  res.status(201).json({
    status: 'success',
    data: {
      address
    }
  });
});

// @desc    Get all addresses for user
// @route   GET /api/users/addresses
// @access  Private
exports.getAddresses = catchAsync(async (req, res, next) => {
  const addresses = await Address.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: addresses.length,
    data: {
      addresses
    }
  });
});

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
exports.getWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate('wishlist');

  res.status(200).json({
    status: 'success',
    data: {
      wishlist: user.wishlist
    }
  });
});

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
exports.addToWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { wishlist: req.params.productId } },
    { new: true }
  ).populate('wishlist');

  res.status(200).json({
    status: 'success',
    data: {
      wishlist: user.wishlist
    }
  });
});

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
exports.removeFromWishlist = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $pull: { wishlist: req.params.productId } },
    { new: true }
  ).populate('wishlist');

  res.status(200).json({
    status: 'success',
    data: {
      wishlist: user.wishlist
    }
  });
});