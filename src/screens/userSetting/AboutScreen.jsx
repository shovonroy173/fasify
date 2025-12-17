import { View, ScrollView } from 'react-native';
import React from 'react';
import { useGetAboutQuery } from '../../redux/slices/authSlice';
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

const AboutScreen = () => {
  const { data: item, isLoading, isError } = useGetAboutQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const aboutData = item?.data;
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
          {aboutData?.appName}
        </ThemedText>

        {/* Description */}
        <SingleSection title="Description" text={aboutData?.description} />

        {/* Our Services */}
        <SingleSection
          title="Our Services"
          text={aboutData?.ourServices?.join(', ')}
        />

        {/* Why Choose Us */}
        <SingleSection
          title="Why Fasisty"
          text={aboutData?.whyFasisty?.join(', ')}
        />

        {/* Mission */}
        <SingleSection title="Our Mission" text={aboutData?.ourMission} />

        {/* Vision */}
        <SingleSection title="Our Vision" text={aboutData?.ourVision} />

        {/* Security & Trust */}
        <SingleSection
          title="Security & Trust"
          text={aboutData?.securityTrust}
        />

        {/* Future Plans */}
        <SingleSection title="Future Plans" text={aboutData?.futurePlans} />
      </ScrollView>
    </ThemedView>
  );
};

export default AboutScreen;
