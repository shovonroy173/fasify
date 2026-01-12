import { View, ScrollView } from 'react-native';
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
    <ThemedText styles="text-lg font-SemiBold mb-2">{title}</ThemedText>
    <ThemedText3 styles="font-Regular">{text}</ThemedText3>
  </View>
);

const Section = ({ title, data }) => (
  <View className="mb-5">
    <ThemedText styles="text-lg font-SemiBold mb-2">{title}</ThemedText>
    {data?.map((item, index) => (
      <ThemedText3 key={index} styles="mb-1 font-Regular">
        • {item}
      </ThemedText3>
    ))}
  </View>
);

const TermsAndConditionsScreen = () => {
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
          FASIFY – TERMS & CONDITIONS
        </ThemedText>

        {/* Introduction */}
        <ThemedText styles="text-base font-Regular mb-4">
          Welcome to Fasify. By accessing or using our mobile application, website, or related services (“Services”), you agree to be bound by these Terms & Conditions. Please read them carefully.
        </ThemedText>

        {/* Acceptance of Terms */}
        <SingleSection
          title="1. Acceptance of Terms"
          text="By creating an account or using Fasify, you agree to comply with these Terms, our Privacy Policy, and all applicable laws."
        />

        {/* Eligibility */}
        <SingleSection
          title="2. Eligibility"
          text="Users must be at least 18 years old or have legal capacity to enter into binding agreements."
        />

        {/* User Accounts */}
        <SingleSection
          title="3. User Accounts"
          text="You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your login details."
        />

        {/* Booking and Payments */}
        <Section
          title="4. Booking and Payments"
          data={[
            "All bookings made through Fasify are subject to availability and confirmation.",
            "Payments are processed securely through third-party payment providers.",
            "Fasify does not store complete payment card details."
          ]}
        />

        {/* Pricing and Fees */}
        <SingleSection
          title="5. Pricing and Fees"
          text="Prices may vary depending on location, availability, and season. Taxes and service fees may apply."
        />

        {/* Cancellations & Refunds */}
        <SingleSection
          title="6. Cancellations & Refunds"
          text="Cancellations are governed by our Cancellation Policy. Refund eligibility depends on the timing and circumstances."
        />

        {/* User Responsibilities */}
        <Section
          title="7. User Responsibilities"
          data={[
            "Provide false information",
            "Misuse the platform",
            "Violate applicable laws",
            "Attempt to hack, reverse-engineer, or disrupt the system"
          ]}
        />

        {/* Prohibited Activities */}
        <Section
          title="8. Prohibited Activities"
          data={[
            "Fraud",
            "Abuse of promotions or discounts",
            "Posting harmful or illegal content",
            "Interfering with other users or hosts"
          ]}
        />

        {/* Host Responsibilities */}
        <SingleSection
          title="9. Host Responsibilities"
          text="Hosts must ensure that accommodation listings are accurate, safe, and comply with local regulations."
        />

        {/* Liability */}
        <SingleSection
          title="10. Liability"
          text="Fasify is not responsible for:\n\n• Damages caused by hosts or guests\n• Cancellations due to external factors\n• Losses arising from misuse of the platform\n\nTo the fullest extent permitted by law, Fasify shall not be liable for indirect, incidental, or consequential damages."
        />

        {/* Intellectual Property */}
        <SingleSection
          title="11. Intellectual Property"
          text="All content, branding, logos, and designs are the property of Fasify and may not be reproduced without permission."
        />

        {/* Suspension & Termination */}
        <SingleSection
          title="12. Suspension & Termination"
          text="We may suspend or terminate accounts that violate these Terms or threaten the safety of the community."
        />

        {/* Data Protection */}
        <SingleSection
          title="13. Data Protection"
          text="Your personal data is handled according to our Privacy Policy."
        />

        {/* Modifications */}
        <SingleSection
          title="14. Modifications"
          text="Fasify may update these Terms at any time. Continued use of the Services constitutes acceptance of revised Terms."
        />

        {/* Governing Law */}
        <SingleSection
          title="15. Governing Law"
          text="These Terms are governed by the laws of the United Kingdom and Nigeria, depending on the user's location."
        />

        {/* Contact Information */}
        <SingleSection
          title="16. Contact Information"
          text="For questions or support, contact us:\n\nEmail: info@fasifys.com\nPhone: +44 7521 010080\nUK Office: 103 Marsh Hill, Erdington, Birmingham, B23 7DU\nNigeria Office: 6 Esomo Close, Off Toyin Street, Ikeja, Lagos"
        />
      </ScrollView>
    </ThemedView>
  );
};

export default TermsAndConditionsScreen;
