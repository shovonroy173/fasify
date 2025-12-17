import { View,  ScrollView } from 'react-native';
import React from 'react';
import { useGetPrivacyPolicyQuery } from '../../redux/slices/authSlice';
import ThemedView from '../../utils/ThemedView';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import GoBack from '../../components/GoBack';
import { useNavigation } from '@react-navigation/native';
import ThemedText from '../../utils/ThemedText';
import ThemedText3 from '../../utils/ThemedText3';

const SingleSection = ({ title, text }) => (
  <View className="mb-5">
    <ThemedText styles="text-lg font-SemiBold  mb-2">{title}</ThemedText>
    <ThemedText3 styles="font-Regular">{text}</ThemedText3>
  </View>
);

const Section = ({ title, data }) => (
  <View className="mb-5">
    <ThemedText styles="text-lg font-SemiBold  mb-2">{title}</ThemedText>
    {data?.map((item, index) => (
      <ThemedText3 key={index} styles="mb-1 font-Regular">
        • {item}
      </ThemedText3>
    ))}
  </View>
);

const PrivacyPolicyScreen = () => {
  const {
    data: item,
    isLoading,
    isError,
  } = useGetPrivacyPolicyQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const policyData = item?.data;
  console.log("LINE AT 41s", policyData);
  const navigation = useNavigation();
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <ThemedText styles="text-2xl font-Bold  mb-3">
          {policyData?.title}
        </ThemedText>

        {/* Introduction */}
        <ThemedText styles="text-base font-Regular mb-4">
          {policyData?.introduction}
        </ThemedText>

        {/* Information we collect */}
        <Section
          title="Information We Collect"
          data={policyData?.information_collect}
        />

        {/* How we use your data */}
        <Section
          title="How We Use Your Data"
          data={policyData?.how_useYour_data}
        />

        {/* Data Security */}
        <SingleSection title="Data Security" text={policyData?.data_security} />

        {/* Third-Party Services */}
        <SingleSection
          title="Third-Party Services"
          text={policyData?.third_party_services}
        />

        {/* User Control */}
        <Section title="User Control" data={policyData?.user_control} />

        {/* Children's Privacy */}
        <SingleSection
          title="Children’s Privacy"
          text={policyData?.children_privacy}
        />

        {/* Changes to Policy */}
        <SingleSection
          title="Changes to Policy"
          text={policyData?.changes_to_policy}
        />

        {/* Contact Info */}
        <SingleSection
          title="Contact Information"
          text={policyData?.contact_info}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default PrivacyPolicyScreen;
