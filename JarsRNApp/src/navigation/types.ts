import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  ProductDetails: { id: string };
  Cart: undefined;
  Checkout: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
};

export type MainTabParamList = {
  Home: undefined;
  Categories: undefined;
  Wishlist: undefined;
  Profile: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
