export enum Path {
  //S3 bucket path for images
  S3Path = 'https://dnstgrepository.s3.amazonaws.com',

  // General containers
  Home = '',
  NotFound = '404',

  // Auth
  SignIn = 'sign-in',
  SignUp = 'sign-up',
  ForgotPassword = 'forgot-password',
  ForgotPasswordEmailSent = 'forgot-password-email-sent',
  PasswordReset = 'password-reset',
  PasswordResetFailed = 'password-reset-failed',
  PasswordResetSucceeded = 'password-reset-succeeded',

  // App base url
  Dashboard = 'dashboard',

  // Settings
  Settings = 'settings',
  SettingsAccount = 'account',
  SettingsAppearance = 'appearance',
  SettingsBilling = 'billing',
  SettingsBlockedUsers = 'blocked-users',
  SettingsNotifications = 'notifications',
  SettingsSecurity = 'security',
  SettingsSecurityLog = 'security-log',

  // User
  Users = 'users',
  UsersOverview = 'overview',
  UsersProfile = ':username',

  // Product

  Product = 'product',
  ProductDetails = 'product-details/:id',
  ProductSearch = 'product-search',
  //Map

  // Map
  Map = 'map-view',

  //Community

  Community = 'community',
  CommunityDetail = 'community-detail',
  CommunityProfile = 'community-profile',
  CommunityChat = 'community-chat',
  CommunityMarketPlace = "community-market-place",
  CommunityMembers = "community-members",
  CommunitySettings = "community-settings",
  CommunitySearch = 'community-search',
  // Other-profile

  OtherProfile = 'other-profile',

  //account-activation
  AccountActivation = "email-verify",

  // password-change
  ChangePassword = 'reset-password',

  //forget password

  //Mobile Screens
  Mobile = "mobile",
  MobileProfilePopOver = "mobile-popover",
  MobileLocationSet = "mobile-location"

}
