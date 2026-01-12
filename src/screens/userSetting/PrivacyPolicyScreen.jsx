import { View,  ScrollView } from 'react-native';
import React from 'react';
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
          FASIFY – PRIVACY POLICY
        </ThemedText>

        {/* Introduction */}
        <ThemedText styles="text-base font-Regular mb-4">
          This Privacy Policy explains how Fasify (“we,” “our,” or “us”) collects, uses, stores, and protects your personal information when you use our mobile application, website, and related services. By using our services, you consent to the practices described in this policy.
        </ThemedText>

        {/* Information We Collect */}
        <Section
          title="1. Information We Collect"
          data={[
            "Personal Information (Name, Email, Phone Number)",
            "Payment Information (Processed securely through third-party gateways)",
            "Location Information (For booking and personalized experience)",
            "Usage & Device Information (IP, browser type, app activity)",
            "Booking Information (Accommodation, dates, preferences)"
          ]}
        />

        {/* How We Use Your Information */}
        <Section
          title="2. How We Use Your Information"
          data={[
            "To provide, operate, and improve our services",
            "To enable secure bookings and transactions",
            "To provide customer support",
            "To enhance user safety and fraud prevention",
            "To send service updates, notifications, or promotional content"
          ]}
        />

        {/* How We Share Your Information */}
        <Section
          title="3. How We Share Your Information"
          data={[
            "With trusted service providers supporting our operations",
            "With accommodation partners and hosts to complete your booking",
            "With legal and regulatory authorities when required",
            "During business transfers such as mergers or acquisitions"
          ]}
        />

        {/* Data Security */}
        <SingleSection
          title="4. Data Security"
          text="We implement industry-standard security measures including encryption, secure servers, and PCI-compliant payment processing to protect your information from unauthorized access or disclosure."
        />

        {/* Your Rights */}
        <SingleSection
          title="5. Your Rights"
          text="Depending on your region, you may have the right to access, correct, delete, restrict processing, or withdraw consent regarding your personal data. To exercise these rights, contact us using the details below."
        />

        {/* Data Retention */}
        <SingleSection
          title="6. Data Retention"
          text="We retain your information only for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements."
        />

        {/* Third-Party Services */}
        <SingleSection
          title="7. Third-Party Services"
          text="Fasify integrates with third-party platforms such as payment gateways, analytics providers, and hosting partners. Each third-party service has its own privacy practices which we encourage you to review."
        />

        {/* Cookies & Tracking Technologies */}
        <SingleSection
          title="8. Cookies & Tracking Technologies"
          text="We use cookies, analytics tools, and device identifiers to improve user experience, analyze usage patterns, and provide personalized content and advertisements."
        />

        {/* Children's Privacy */}
        <SingleSection
          title="9. Children's Privacy"
          text="Fasify is not intended for children under the age of 16, and we do not knowingly collect information from minors."
        />

        {/* International Data Transfers */}
        <SingleSection
          title="10. International Data Transfers"
          text="Your information may be processed and stored in countries outside your own. We ensure appropriate safeguards such as GDPR-compliant transfer mechanisms."
        />

        {/* Changes to This Policy */}
        <SingleSection
          title="11. Changes to This Policy"
          text="We may update this Privacy Policy periodically. Changes will be reflected with a new 'Last Updated' date."
        />

        {/* Contact Us */}
        <SingleSection
          title="12. Contact Us"
          text="Email: info@fasifys.com\nPhone: +44 7521 010080\nUK Office: 103 Marsh Hill, Erdington, Birmingham, B23 7DU\nNigeria Office: 6 Esomo Close, Off Toyin Street, Ikeja, Lagos"
        />
      </ScrollView>
    </ThemedView>
  );
};

export default PrivacyPolicyScreen;
