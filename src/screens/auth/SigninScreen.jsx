import {
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import ThemedView from "@/utils/ThemedView";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import GoBack from "@/components/GoBack";
import { useNavigation } from "@react-navigation/native";
import ThemedText from "@/utils/ThemedText";
import useT from "@/utils/useT";
import ThemedTextInput from "@/utils/ThemedTextInput";
import { useFormContext } from "react-hook-form";
import { useThemeColor } from "@/utils/useThemeColor";
import { Eye, EyeOff } from "lucide-react-native";
import Button from "@/components/Button";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "@/redux/slices/authSlice";
import ThemedText3 from "@/utils/ThemedText3";
import messaging from "@react-native-firebase/messaging";

// import * as Google from 'expo-google-auth-session';
// import * as Facebook from 'expo-facebook';
// import * as AppleAuthentication from 'expo-apple-authentication';

import * as Keychain from "react-native-keychain";
import CustomCheckbox from "@/components/CustomCheckbox";
import ThemedTextColor from "@/utils/ThemedTextColor";
import ThemedPressable2 from "@/utils/ThemedPressable2";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import {
  configureGoogleSignIn,
  handleGoogleLogin,
} from "@/utils/googleAuthService";

const SigninScreen = () => {
  const navigation = useNavigation();
  const { icon2 } = useThemeColor();
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [login] = useLoginMutation();
  const [socialLogin] = useSocialLoginMutation();
  const { role } = getValues();
  // console.log("RENDER SIGIN SCREEN", getValues("role"));
  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  const togglePasswordVisibility = () => setPasswordVisible(!isPasswordVisible);

  // Save and load credentials from Keychain (secure storage)
  // const saveCredentials = async (email, password) => {
  //   try {
  //     await Keychain.setGenericPassword(email, password, {
  //       accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
  //     });
  //   } catch (error) {
  //     console.error("Failed to save credentials securely:", error);
  //   }
  // };

  // const loadCredentials = async () => {
  //   try {
  //     const credentials = await Keychain.getGenericPassword();
  //     if (credentials) {
  //       return { email: credentials.username, password: credentials.password };
  //     }
  //   } catch (error) {
  //     console.error("Failed to load credentials securely:", error);
  //   }
  //   return { email: "", password: "" };
  // };

  // const clearCredentials = async () => {
  //   try {
  //     await Keychain.resetGenericPassword();
  //   } catch (error) {
  //     console.error("Failed to clear credentials securely:", error);
  //   }
  // };

  const saveCredentials = async (email, password) => {
    try {
      await Keychain.setInternetCredentials(
        "user_auth", // Service name for user
        email,
        password,
        {
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        }
      );
    } catch (error) {
      console.error("Failed to save user credentials:", error);
    }
  };

  const loadCredentials = async () => {
    try {
      const credentials = await Keychain.getInternetCredentials("user_auth");
      if (credentials) {
        console.log("LINE AT ", credentials);

        return {
          email: credentials.username,
          password: credentials.password,
        };
      }
    } catch (error) {
      console.error("Failed to load user credentials:", error);
    }
    return { email: "", password: "" };
  };

  const clearCredentials = async () => {
    try {
      await Keychain.resetInternetCredentials("user_auth");
    } catch (error) {
      console.error("Failed to clear user credentials:", error);
    }
  };

  useEffect(() => {
    const preloadCredentials = async () => {
      const { email, password } = await loadCredentials();
      if (email && password) {
        setValue("email", email);
        setValue("password", password);
        setIsChecked(true);
      }
    };
    preloadCredentials();
  }, []);

  const handleSubmitLogin = (data) => ({
    unwrap: async () => {
      if (isChecked) {
        await saveCredentials(data.email, data.password);
      } else {
        await clearCredentials();
      }

      return await login(data).unwrap();
    },
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    const result = await handleGoogleLogin();

    if (result?.success) {
      const fcmToken = await messaging().getToken();

      const itemData = {
        email: result.user.email,
        role: role,
        fcmToken: fcmToken,
      };

      await socialLogin(itemData).unwrap();
      navigation.navigate("ClientTypeHome");
    } else {
      console.log("Login failed:", result.error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      console.log("LINE AT 173", result);

      if (result.isCancelled) {
        console.log("Login cancelled");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        console.log("Something went wrong getting access token");
        return;
      }

      const responseFB = await fetch(
        `https://graph.facebook.com/v17.0/me?fields=id,name,email&access_token=${data.accessToken}`
      );

      const userInfo = await responseFB.json();

      const fcmToken = await messaging().getToken();

      const itemData = {
        email: userInfo.email,
        // password: password,
        role: role,
        fcmToken: fcmToken,
      };

      const response = await socialLogin(itemData).unwrap();
      console.log("Social login response:", response);
      navigation.navigate("ClientTypeHome");

      // console.log('User Info:', userInfo);
      // console.log('Email:', userInfo.email);
      // console.log('Access Token:', data.accessToken.toString());

      // send access token back to react-hook-form
      // onChange(data.accessToken.toString());
      // console.log(data.accessToken.toString());
      // console.log("LINE AT 188", jwtDecode(data.accessToken));
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };

  const t = useT();
  return (
    <ThemedView
      styles="flex-1"
      style={{
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(5),
        gap: responsiveHeight(5),
      }}
    >
      <GoBack navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
          <ThemedView
            styles="flex-1"
            style={{
              gap: responsiveHeight(2),
            }}
          >
            <ThemedView styles="gap-2">
              <ThemedText styles="font-Bold text-5xl h-16">
                {t("signin.title")}
              </ThemedText>
              <ThemedText styles="font-Bold text-lg">
                {t("signin.subtitle")}
              </ThemedText>
            </ThemedView>

            <ScrollView
              className="flex-grow"
              showsVerticalScrollIndicator={false}
            >
              <ThemedTextInput
                name="email"
                control={control}
                label={t("signin.email_label")}
                placeholder={t("signin.email_placeholder")}
                type="email"
              />
              <ThemedTextInput
                name="password"
                control={control}
                label={t("signin.password_label")}
                placeholder={t("signin.password_placeholder")}
                type="text"
                secureTextEntry={!isPasswordVisible}
                rightIcon={
                  isPasswordVisible ? (
                    <EyeOff size={24} color={icon2} />
                  ) : (
                    <Eye size={24} color={icon2} />
                  )
                }
                onPressToggle={togglePasswordVisibility}
              />

              <Text className="text-red-500 text-xs font-Regular mb-2">
                {errors?.root?.message}
              </Text>

              <ThemedView styles="gap-2">
                <Button
                  title={t("signin.button")}
                  navigation={navigation}
                  path="ClientTypeHome"
                  ids={["email", "password"]}
                  submission={handleSubmitLogin}
                  isLogin={true}
                />

                <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center justify-center gap-2">
                    <CustomCheckbox
                      checked={isChecked}
                      onToggle={() => setIsChecked((prev) => !prev)}
                    />
                    <ThemedText styles="font-Medium font-md">
                      Remember me
                    </ThemedText>
                  </View>
                  <Pressable
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <ThemedText styles="font-Medium font-md border-b">
                      Forgot password?
                    </ThemedText>
                  </Pressable>
                </View>

                <ThemedView styles="gap-5">
                  <ThemedText3 styles="font-Medium text-center">
                    {t("signin.or")}
                  </ThemedText3>

                  <ThemedView styles="flex-row items-center justify-center gap-2">
                    <ThemedPressable2
                      onPress={handleFacebookLogin}
                      styles="flex-row items-center justify-center rounded-md"
                      style={{
                        height: responsiveHeight(9),
                        width: responsiveWidth(28),
                      }}
                    >
                      <Image
                        source={require("assets/images/fbicon.webp")}
                        style={{
                          width: responsiveWidth(6),
                          height: responsiveHeight(3),
                        }}
                      />
                    </ThemedPressable2>

                    <ThemedPressable2
                      onPress={handleGoogleSignIn}
                      styles="flex-row items-center justify-center rounded-md"
                      style={{
                        height: responsiveHeight(9),
                        width: responsiveWidth(28),
                      }}
                    >
                      <Image
                        source={require("assets/images/google.webp")}
                        style={{
                          width: responsiveWidth(10),
                          height: responsiveHeight(5),
                        }}
                      />
                    </ThemedPressable2>

                    {/* {Platform.OS === 'ios' && (
                      <ThemedPressable2 onPress={handleAppleSignIn} styles="flex-row items-center justify-center rounded-md" style={{ height: responsiveHeight(9), width: responsiveWidth(28) }}>
                        <Image source={require('assets/images/apple.webp')} style={{ width: responsiveWidth(10), height: responsiveHeight(5) }} />
                      </ThemedPressable2>
                    )} */}
                  </ThemedView>

                  <ThemedView styles="flex-row items-center justify-center gap-2">
                    <ThemedText3 styles="font-Medium">
                      {t("signin.no_account")}
                    </ThemedText3>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                      <ThemedTextColor styles="font-Medium">
                        {t("signin.signup")}
                      </ThemedTextColor>
                    </Pressable>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ScrollView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default SigninScreen;
