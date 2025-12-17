import { View, ScrollView } from 'react-native';
import React from 'react';
import { useGetTermsQuery } from '../../redux/slices/authSlice';
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
    <ThemedText styles="text-lg font-SemiBold mb-2">{title}</ThemedText>
    <ThemedText3 styles="font-Regular">{text}</ThemedText3>
  </View>
);

const TermsAndConditionsScreen = () => {
  const {
    data: item,
    isLoading,
    isError,
  } = useGetTermsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const termsData = item?.data;
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
        <ThemedText styles="text-2xl font-Bold mb-3">
          {termsData?.title}
        </ThemedText>

        {/* Acceptance of Terms */}
        <SingleSection
          title="Acceptance of Terms"
          text={termsData?.acceptance_terms}
        />

        {/* App Purpose */}
        <SingleSection title="App Purpose" text={termsData?.app_purpose} />

        {/* User Responsibilities */}
        <SingleSection
          title="User Responsibilities"
          text={termsData?.user_responsibilities}
        />

        {/* Data Usage */}
        <SingleSection title="Data Usage" text={termsData?.data_usage} />

        {/* Intellectual Property */}
        <SingleSection
          title="Intellectual Property"
          text={termsData?.intellectual_property}
        />

        {/* Limitation */}
        <SingleSection title="Limitation" text={termsData?.limitation} />

        {/* Updates */}
        <SingleSection title="Updates" text={termsData?.updates} />
      </ScrollView>
    </ThemedView>
  );
};

export default TermsAndConditionsScreen;
